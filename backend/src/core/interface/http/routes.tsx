export const routes: RouteType[] = [
    {
        path: "/todos",
        controller: listTodoController,
        method: "get"
    },
    {
        path: "/todos",
        controller: createTodoController,
        method: "post"
    },
    {
        path: "/todos/:id/toggle",
        controller: toggleTodoController,
        method: "post"
    }
];

type RouteType = {
    path: string,
    controller: any,
    method: "get" | "post",
    validationSchema?: any
}