import Queue from 'bull'
import { checkIfPackageIsInstalled } from '../borrowed/checkInstalledPackages'
import { WertikApp, WertikConfiguration } from '../types'
import { useQueueProps } from './../types/queue'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { defaultPort } from 'src/borrowed/options'

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
}): any => {
  const port = props.configuration.port ?? defaultPort
  const isInstalledBullBoardExpress = checkIfPackageIsInstalled(
    '@bull-board/express'
  )
  if (!isInstalledBullBoardExpress) {
    throw new Error(
      'Please install package @bull-board/express to initialize Bull Board for Queue'
    )
  }
  const {
    express,
    queue: { jobs: QueueJobs },
  } = props.wertikApp

  const queueJobsArr: BullAdapter[] = []

  const queuePath =
    props?.configuration?.queue?.options?.uiPath ?? '/admin/queues'
  for (const queueName of Object.keys(QueueJobs || {})) {
    queueJobsArr.push(new BullAdapter(QueueJobs[queueName]))
  }
  const serverAdapter = new ExpressAdapter()
  const bullBoardInstance = createBullBoard({
    queues: queueJobsArr,
    serverAdapter,
  })
  serverAdapter.setBasePath(queuePath)
  express.use(queuePath, serverAdapter.getRouter())

  console.log(
    `Queue UI Monitoring Bull Board running at: http://localhost:${port}${queuePath}`
  )

  return bullBoardInstance
}
