import { t } from "elysia";
import { CreateTodoUseCase } from "./core/application/use-case/create-todo/create-todo-use-case";
import { DeleteTodoUseCase } from "./core/application/use-case/delete-todo/delete-todo-use-case";
import { ListTodoUseCase } from "./core/application/use-case/list-todo/list-todo-use-case";
import { ToggleTodoUseCase } from "./core/application/use-case/toggle-todo/toggle-todo-use-case";
import { Controller } from "./core/interface/controller/controller";
import { RouteType } from "./core/interface/http/i-http-server";
import { SqliteConnection } from "./database/sqlite-connection";
import { ElysiaHttpServer } from "./http/elysia-http-server";
import { DatabaseTodoRepository } from "./infra/repository/database-todo-repository";
import { CreateTodoInput } from "./core/application/use-case/create-todo/create-todo-input";
import { ToggleTodoInput } from "./core/application/use-case/toggle-todo/toggle-todo-input";
import { CreateTodoOutput } from "./core/application/use-case/create-todo/create-todo-output";
import { DeleteTodoInput } from "./core/application/use-case/delete-todo/delete-todo-input";
import { ToggleTodoOutput } from "./core/application/use-case/toggle-todo/toggle-todo-output";
import { ListTodoOutput } from "./core/application/use-case/list-todo/list-todo-output";

const enviroment = process.env.NODE_ENV;
const port = Number(process.env.PORT) || 3000;

const sqlConnection = new SqliteConnection(enviroment);
const todoRepository = new DatabaseTodoRepository(sqlConnection);

const createTodoUseCase = new CreateTodoUseCase(todoRepository);
const toggleTodoUseCase = new ToggleTodoUseCase(todoRepository);
const listTodoUseCase = new ListTodoUseCase(todoRepository);
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

const createTodoController = new Controller<CreateTodoInput, CreateTodoOutput>(createTodoUseCase);
const toggleTodoController = new Controller<ToggleTodoInput, ToggleTodoOutput>(toggleTodoUseCase);
const listTodoController = new Controller<unknown, ListTodoOutput>(listTodoUseCase);
const deleteTodoController = new Controller<DeleteTodoInput, unknown>(deleteTodoUseCase);

const routes = [
	{
		path: "/todo",
		controller: createTodoController,
		method: "post",
		config: {
			validationSchema: t.Object({
				id: t.Optional(t.String()),
				description: t.String(),
			}),
		},
	},
	{
		path: "/todo/:id",
		controller: deleteTodoController,
		method: "delete",
		config: {
			params: t.Object({
				id: t.String(),
			}),
		},
	},
	{
		path: "/todo",
		controller: listTodoController,
		method: "get",
	},
	{
		path: "/todo/:id/toggle",
		controller: toggleTodoController,
		method: "post",
		config: {
			validationSchema: t.Object({
				done: t.Boolean(),
			}),
			params: t.Object({
				id: t.String(),
			}),
		},
	},
] as RouteType[];

export const app = new ElysiaHttpServer(process.env.NODE_ENV === "development")
	.registerErrorHandler()
	.registerRoutes(routes)
	.listen(port);
