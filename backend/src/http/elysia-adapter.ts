import { ControllerOutput } from "../core/interface/controller/controller";
import { IController } from "../core/interface/controller/i-controller";

export const elysiaAdapter = <T>(
	controller: IController<T, ControllerOutput>,
) => {
	return async ({ body, params }: { body: unknown; params: unknown }) => {
		const input = {
			// biome-ignore lint:
			...body as Object,
			// biome-ignore lint:
			...params as Object,
		} as T;
		const output = (await controller.execute(
			input,
		)) as ControllerOutput;

		return new Response(output.body, {
			headers: {
				"Content-Type": "application/json",
			},
			status: output.statusCode,
		});
	};
};
