import { QueueOptions } from "bull"

export interface UseQueueProps {
  name: string
  url?: string
  options?: QueueOptions
}
