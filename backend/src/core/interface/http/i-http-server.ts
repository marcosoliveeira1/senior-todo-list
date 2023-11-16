import { IController } from "../controller/i-controller"

export interface IHttpServer<T> {
  registerRoutes(routes: RouteType[]): T
  registerErrorHandler(): T
  listen(port: number): T
}

export interface RouteType {
  path: string
  controller: IController
  method: "get" | "post" | "delete"
  config?: {
    validationSchema?: any
    params?: any,
    response?: {
      200: any
      400: any
    }

  }
}