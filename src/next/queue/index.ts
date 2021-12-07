import bullQueue from "bull";
import { QueueOptions } from "../types/queue";

/**
 * @param queueName
 * @param url
 * @param opts
 * @returns
 */

export const Queue = (
  queueName?: string,
  url?: string,
  opts?: QueueOptions
) => {
  return (async) => new bullQueue(queueName, url, opts);
};
