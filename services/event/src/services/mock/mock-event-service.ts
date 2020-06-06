import { EventService } from "../event-service"
import { EventMessage } from "../../schema/event-message"

export class MockEventService implements EventService
{
    events: [EventMessage] = [
        { topic: "MockTopic" }
    ]
}