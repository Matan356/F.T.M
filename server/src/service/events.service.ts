import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import EventsModel, { EventsDocument } from "../models/events.model";
import logger from "../utils/logger";

export async function createEvent(
  input: DocumentDefinition<Omit<EventsDocument, "createdAt" | "updatedAt">>
) {
  return EventsModel.create(input);
}

export async function findEvent(query: FilterQuery<EventsDocument>) {
  return EventsModel.findById(query);
}

export async function findAndUpdateEvent(
  query: FilterQuery<EventsDocument>,
  update: UpdateQuery<EventsDocument>,
  options: QueryOptions
) {
  return EventsModel.findOneAndUpdate(query, update, options);
}

export async function deleteEvent(query: FilterQuery<EventsDocument>) {
  logger.info({ query: query });
  return EventsModel.findByIdAndDelete(query);
}

export async function getEvents() {
  let events;
  try {
    return (events = await EventsModel.find());
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserEvents(
  query: FilterQuery<EventsDocument>,
  options: QueryOptions = { lean: true }
) {
  let events;
  return (events = await EventsModel.find(query, {}, options));
}
