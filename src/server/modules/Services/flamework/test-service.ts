import { Service, OnTick, OnInit } from "@flamework/core";

@Service()
export class TestService implements OnInit, OnTick {
	onInit(): void | Promise<void> {
		print("oh boy!");
	}

	onTick(dt: number): void {
		print("ITS WORKING");
	}
}
