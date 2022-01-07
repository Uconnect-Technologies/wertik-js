import { QueueOptions } from "bull"

export interface useQueueProps {
  name: string
  url?: string
  options?: QueueOptions
}
