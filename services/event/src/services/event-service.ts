import { EventMessage } from "../schema/event-message"

export interface EventService {
    events: [EventMessage]
}