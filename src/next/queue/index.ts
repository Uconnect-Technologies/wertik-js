import Queue from "bull"
import { checkIfPackageIsInstalled } from "../../framework/initialization/checkInstalledPackages"
import { WertikApp, WertikConfiguration } from "../types"
import { useQueueProps } from "../types/queue"

/**
 * @param name
 * @param url
 * @param opts
 * @returns Queue
 */

export const useQueue = (props: useQueueProps) => {
  return () => new Queue(props.name, props.url, props.options)
}

export const initializeBullBoard = (props: {
  wertikApp: WertikApp
  configuration: WertikConfiguration
}) => {
  var isInstalledBullBoardExpress = checkIfPackageIsInstalled(
    "@bull-board/express"
  )
  if (!isInstalledBullBoardExpress) {
    throw new Error(
      "Please install package @bull-board/express to initialize Bull Board for Queue"
    )
  }
  const {
    express,
    queue: { jobs: QueueJobs },
  } = props.wertikApp

  const quelist = []

  const { createBullBoard } = require("@bull-board/api")
  const { BullAdapter } = require("@bull-board/api/bullAdapter")
  const { ExpressAdapter } = require("@bull-board/express")

  if (QueueJobs) {
    for (const queueName of Object.keys(QueueJobs || {})) {
      var queueInstance = QueueJobs[queueName]
      quelist.push(new BullAdapter(queueInstance))
    }
    const serverAdapter = new ExpressAdapter()
    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard(
      {
        queues: quelist,
        serverAdapter: serverAdapter,
      }
    )
    serverAdapter.setBasePath(
      props?.configuration?.queue?.options?.uiPath ?? "/admin/queues"
    )
    express.use(
      props?.configuration?.queue?.options?.uiPath ?? "/admin/queues",
      serverAdapter.getRouter()
    )

    return { addQueue, removeQueue, setQueues, replaceQueues }
  }
}
