import { EventService } from "../event-service"
import { EventMessage } from "../../schema/event-message"

export class DynamodbEventService implements EventService
{
    events: [EventMessage] = [
        { topic: "DynamodbTopic" }
    ]
}