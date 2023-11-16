import Elysia, { t } from "elysia";
import { elysiaAdapter } from "./elysia-adapter";
import { IHttpServer, RouteType } from "../core/interface/http/i-http-server";
import swagger from "@elysiajs/swagger";


export class ElysiaHttpServer implements IHttpServer<ElysiaHttpServer> {
    private app: any;

    constructor(isDevelopment: boolean) {
        this.app = new Elysia();
        if (isDevelopment) {
            this.app.use(swagger({
                path: "/swagger",
                documentation: {
                    info: {
                        title: 'Todo list app documentation',
                        version: '1.0.0'
                    },
                }

            }))
        }
    }

    registerRoutes(routes: RouteType[]): ElysiaHttpServer {
        routes.forEach(({ method, path, controller, config = {} }) => {
            const responses = {
                500: t.Object({
                    errors: t.Array(t.String())
                }),
               ...config.response,
            }

            this.app[method](path, elysiaAdapter(controller), {
                body: config?.validationSchema,
                response: responses,
                params: config.params
            });
        })
        return this;
    }

    registerErrorHandler(): ElysiaHttpServer {
        this.app.onError((error: any) => {
            switch (error?.code) {
                
                case 'NOT_FOUND':
                    return new Response("Not Found", {
                        status: 404
                    });
                case 'VALIDATION':
                    const errors = error.error.all.map((err: any) => {
                        return `${err.message} (${err.path.replace('/', '')})`
                    })

                    return new Response(JSON.stringify({ errors }), {
                        status: 400
                    })
                case 'PARSE':
                    return new Response(JSON.stringify(error), {
                        status: 400
                    })

                case 'UNKNOWN':
                    if (error?.error?.message?.includes("parse")) {
                        return new Response(JSON.stringify({ errors: [error.error.message] }), {
                            status: 400
                        })
                    }

                default:
                    console.log({ error });

                    return new Response("Internal Server Error", {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        status: 500
                    });
            }
        })
        return this;
    }

    listen(port: number): ElysiaHttpServer {
        this.app.listen(port);
        return this;
    }
}