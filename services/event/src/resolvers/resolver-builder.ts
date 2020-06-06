import { EventService } from "../services/event-service"

export class ResolverBuilder
{
  private eventService : EventService

  constructor(eventService : EventService) {
    this.eventService = eventService;
  }

  Build() : any { 
    return {
      Query: {
        events: () => this.eventService.events
      }
    }
  }
};