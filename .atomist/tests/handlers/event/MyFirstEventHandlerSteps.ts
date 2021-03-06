import { Given, When, Then, HandlerScenarioWorld, EventHandlerScenarioWorld } from "@atomist/rug/test/handler/Core";
import { DirectedMessage } from '@atomist/rug/operations/Handlers'
import { Tag } from "@atomist/cortex/stub/Tag";


Given("the MyFirstEventHandler is registered", (world: HandlerScenarioWorld) => {
    let w: EventHandlerScenarioWorld = world as EventHandlerScenarioWorld;
    w.registerHandler("MyFirstEventHandler");
});

const tagName = "1.2.3";

When("a new Tag is received", (world: HandlerScenarioWorld) => {
    let w: EventHandlerScenarioWorld = world as EventHandlerScenarioWorld;
    let tag: Tag = new Tag().withName(tagName);
    w.sendEvent(tag);
});

Then("the event handler should respond with the correct message", (world: HandlerScenarioWorld) => {
    const expected = `Tag event: ${tagName}`;
    const message = (world.plan().messages[0] as DirectedMessage).body;
    return message == expected;
});
