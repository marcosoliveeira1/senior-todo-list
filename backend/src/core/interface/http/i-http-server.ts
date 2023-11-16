import { IController } from "../controller/i-controller";

export interface IHttpServer<T, U, V> {
	registerRoutes(routes: RouteType[]): T;
	registerErrorHandler(): T;
	listen(port: number): T;
}

export interface RouteType {
	path: string;
	controller: IController;
	method: "get" | "post" | "delete";
	config?: {
		// biome-ignore lint:
		validationSchema?: any;
		// biome-ignore lint:
		params?: any;
	};
}
