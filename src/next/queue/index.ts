import Queue from "bull"
import { useQueueProps } from "../types/queue"

/**
 * @param queueName
 * @param url
 * @param opts
 * @returns
 */

export const useQueue = (props: useQueueProps) => {
  return () => new Queue(props.queueName, props.url, props.options)
}
