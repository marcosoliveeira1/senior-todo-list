import { IController } from "../core/interface/controller/i-controller";
import { ControllerOutput } from "../core/interface/controller/controller";

export const elysiaAdapter = (controller: IController) => {
    return async ({ body, params }: { body: any, params: any }) => {
        const input = {
            ...body,
            ...params
        }
        const output = await controller.execute(input) as ControllerOutput;

        return new Response(output.body, {
            headers: {
                'Content-Type': 'application/json'
            },
            status: output.statusCode
        },)

    }
}