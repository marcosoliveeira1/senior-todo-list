import { beforeEach, describe, expect, it } from 'bun:test'
import { app } from '.'
import Elysia from 'elysia'

describe('Elysia', () => {
    // @ts-ignore
    const { app: sut }: { app: Elysia } = app
    const baseUrl = "http://localhost/todo";


    const createTodo = async (id: string, description: string) => {
        return await sut.handle(
            new Request(baseUrl, {
                method: 'POST',
                body: JSON.stringify({ description, id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )
    }

    beforeEach(async () => {
        const data = await sut.handle(
            new Request(baseUrl)
        )

        const { todos } = await data.json();

        todos.forEach(async (todo: any) => {
            await sut.handle(
                new Request(baseUrl + "/" + todo.id, {
                    method: 'DELETE'
                })
            )
        })
    })


    it('should create a todo', async () => {
        const data = await sut.handle(
            new Request(baseUrl, {
                method: 'POST',
                body: JSON.stringify({ description: 'test', id: '1' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )

        const { id, description, done } = await data.json();

        expect(data.status).toBe(200);

        expect(id).toBe('1');
        expect(description).toBe('test');
        expect(done).toBe(false);
    })

    it('should list todos', async () => {
        await createTodo('1', 'some todo');
        await createTodo('2', 'another todo');


        await sut.handle(
            new Request(baseUrl + "/2/toggle", {
                method: 'POST',
                body: JSON.stringify({ done: true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )

        const data = await sut.handle(
            new Request(baseUrl)
        )

        const { todos } = await data.json();
        expect(data.status).toBe(200);
        expect(todos.length).toBe(2);
        expect(todos[0].id).toBe('1');
        expect(todos[0].description).toBe('some todo');
        expect(todos[0].done).toBeFalse();
        expect(todos[1].id).toBe('2');
        expect(todos[1].description).toBe('another todo');
        expect(todos[1].done).toBeTrue();
    })

    it('should delete a todo', async () => {
        await createTodo('1', 'some todo');

        const data = await sut.handle(
            new Request(baseUrl + "/1", {
                method: 'DELETE'
            })
        )

        expect(data.status).toBe(200);
    });


    it('should return 404 on unknown route', async () => {
        const data = await sut.handle(
            new Request("http://localhost/not-found")
        )

        expect(data.status).toBe(404);
    })

    it('should return 400 if description is less than 3', async () => {
        const data = await sut.handle(
            new Request(baseUrl, {
                method: 'POST',
                body: JSON.stringify({ description: '12' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )

        expect(data.status).toBe(400);
        const { errors } = await data.json();
        expect(errors[0]).toBe('Description must be at least 3 characters long');
    })

    it('should return 400 if description is empty ', async () => {
        const data = await sut.handle(
            new Request(baseUrl, {
                method: 'POST',
                body: JSON.stringify({ description: '' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )

        expect(data.status).toBe(400);
        const { errors } = await data.json();
        expect(errors[0]).toBe('Description is required');
    })

    it('should return 400 if todo description already used ', async () => {
        await createTodo('1', 'some todo');

        const data = await sut.handle(
            new Request(baseUrl, {
                method: 'POST',
                body: JSON.stringify({ description: 'some todo' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )

        expect(data.status).toBe(400);
        const { errors } = await data.json();
        expect(errors[0]).toBe('Todo already exists');
    })

    it('should return 400 if todo id already used ', async () => {
        await createTodo('1', 'some todo');

        const data = await sut.handle(
            new Request(baseUrl, {
                method: 'POST',
                body: JSON.stringify({ description: 'some todo', id: '1' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )

        expect(data.status).toBe(400);
        const { errors } = await data.json();
        expect(errors[0]).toBe('Todo already exists');
    })

    it('should return a empty list of todos ', async () => {
        const data = await sut.handle(
            new Request(baseUrl)
        )

        const { todos } = await data.json();

        expect(data.status).toBe(200);
        expect(todos.length).toBe(0);
    })

    it('should return 404 if toggle a non existent todo', async () => {
        const data = await sut.handle(
            new Request(baseUrl + "/1/toggle", {
                method: 'POST',
                body: JSON.stringify({ done: true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )

        expect(data.status).toBe(400);
        expect((await data.json()).errors[0]).toBe('Todo not found');
    });

    it('should return 404 if delete a non existent todo', async () => {
        const data = await sut.handle(
            new Request(baseUrl + "/1", {
                method: 'DELETE'
            })
        )

        expect(data.status).toBe(400);
        expect((await data.json()).errors[0]).toBe('Todo not found');
    });
})