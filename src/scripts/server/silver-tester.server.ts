import { Events } from "server/networking";

while (task.wait(1)) {
	Events.currency.changed.broadcast("Silver", math.random(1e6));
}
