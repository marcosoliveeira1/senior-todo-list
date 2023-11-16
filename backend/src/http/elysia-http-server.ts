import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia, { t } from "elysia";
import { IHttpServer, RouteType } from "../core/interface/http/i-http-server";
import { elysiaAdapter } from "./elysia-adapter";

export class ElysiaHttpServer implements IHttpServer<ElysiaHttpServer> {
	private readonly app: Elysia;

	constructor(isDevelopment: boolean) {
		this.app = new Elysia();

		this.app.use(cors());

		if (isDevelopment) {
			this.app.use(
				swagger({
					path: "/swagger",
					documentation: {
						info: {
							title: "Todo list app documentation",
							version: "1.0.0",
						},
					},
				}),
			);
		}
	}

	registerRoutes(routes: RouteType[]): ElysiaHttpServer {
		for (const route of routes) {
			const { path, controller, method, config } = route;
			const responses = {
				500: t.Object({
					errors: t.Array(t.String()),
				}),
				400: t.Object({
					errors: t.Array(t.String()),
				}),
			};

			this.app[method as "get" | "post" | "delete"](
				path,
				elysiaAdapter(controller),
				{
					body: config?.validationSchema,
					response: responses,
					params: config?.params,
				},
			);
		}
		return this;
	}

	registerErrorHandler(): ElysiaHttpServer {
		this.app.onError((error) => {
			switch (error?.code) {
				case "NOT_FOUND": {
					return new Response("Not Found", {
						status: 404,
					});
				}
				case "VALIDATION": {
					const errors = error.error.all.map(
						(err: { message: string; path: string }) => {
							return `${err.message} (${err.path.replace("/", "")})`;
						},
					);

					return new Response(JSON.stringify({ errors }), {
						status: 400,
					});
				}
				case "PARSE": {
					return new Response(JSON.stringify(error), {
						status: 400,
					});
				}
				case "UNKNOWN" && error?.error?.message.includes("parse"): {
					return new Response(
						JSON.stringify({ errors: [error.error.message] }),
						{
							status: 400,
						},
					);
				}
				default: {
					console.log({ error });

					return new Response("Internal Server Error", {
						headers: {
							"Content-Type": "application/json",
						},
						status: 500,
					});
				}
			}
		});
		return this;
	}

	listen(port: number): ElysiaHttpServer {
		this.app.listen(port);
		return this;
	}
}

type ElysiaError = {
	code: string;
	error: {
		message: string;
		all: { message: string; path: string }[];
	};
};
