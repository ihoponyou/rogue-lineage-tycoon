import { Events } from "server/networking";

while (task.wait(1)) {
	Events.silver.changed.broadcast(math.random(1e6));
	print("ok");
}
