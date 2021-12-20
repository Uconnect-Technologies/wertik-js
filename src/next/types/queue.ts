import { QueueOptions } from "bull";

export interface useQueueProps {
  queueName?: string
  url?: string
  options?: QueueOptions
}