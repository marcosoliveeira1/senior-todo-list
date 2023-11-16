import React, { useState } from 'react';
import './App.css'
import { TodoView } from './components/todo-view'
import { TodoType } from './types'
import { v4 as uuidv4 } from 'uuid';


function App() {


  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: uuidv4(),
      description: "Estudar Typescript",
      done: false
    },
    {
      id: uuidv4(),
      description: "Lavar carro",
      done: false
    },
    {
      id: uuidv4(),
      description: "Ler livro",
      done: true
    }
  ]);

  const [description, setDescription] = useState('');

  function addTodo(description: string) {
    if (description.trim() === '') return;
    if(todos.some((todo) => todo.description === description)) return;
    if(todos.filter((todo) => !todo.done).length >= 5) return;
    const newTodos = [...todos, { id: uuidv4(), description, done: false }];
    setTodos(newTodos);
    setDescription('');
  }

  const toggleTodo = (id: string) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  }

  const removeTodo = (id: string) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addTodo(description);
  }

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">

      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium">Lista de tarefas</h1>
        </div>
      </div>
      <form className="w-full mx-auto py-2" onSubmit={submitForm}>
        <div className="flex items-center border-b-2 border-sky-600 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Adicionar item"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <button
            className="flex-shrink-0 bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Adicionar
          </button>
        </div>
      </form >
      <TodoView todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />

    </div >
  )
}

export default App
