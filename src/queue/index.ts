import Queue from 'bull'
import { defaultPort } from 'src/borrowed/options'
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

export const useQueue = (props: useQueueProps): any => {
  const url = props.url
  if (!url) throw new Error('useQueue.url is required but not passed')
  return () => new Queue(props.name, url, props.options)
}

export const initializeBullBoard = (props: {
  wertikApp: WertikApp
  configuration: WertikConfiguration
}): any => {
<<<<<<< HEAD
  const port = props.configuration.port ?? defaultPort
=======
>>>>>>> 681bf23 (Fixing lint issues)
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

<<<<<<< HEAD
  const queueJobsArr: BullAdapter[] = []

  const queuePath =
    props?.configuration?.queue?.options?.uiPath ?? '/admin/queues'
  for (const queueName of Object.keys(QueueJobs || {})) {
    queueJobsArr.push(new BullAdapter(QueueJobs[queueName]))
=======
  const queueJobsArr: any[] = []
  // eslint-disable-next-line
  const { createBullBoard } = require('@bull-board/api')
  // eslint-disable-next-line
  const { BullAdapter } = require('@bull-board/api/bullAdapter')
  // eslint-disable-next-line
  const { ExpressAdapter } = require('@bull-board/express')

  if (QueueJobs) {
    const queuePath =
      props?.configuration?.queue?.options?.uiPath ?? '/admin/queues'
    for (const queueName of Object.keys(QueueJobs || {})) {
      queueJobsArr.push(new BullAdapter(QueueJobs[queueName]))
    }
    const serverAdapter = new ExpressAdapter()
    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard(
      {
        queues: queueJobsArr,
        serverAdapter,
      }
    )
    serverAdapter.setBasePath(queuePath)
    express.use(queuePath, serverAdapter.getRouter())
    const port = props.configuration.port ?? defaultPort

    console.log(
      `Queue UI Monitoring Bull Board running at: http://localhost:${port}${queuePath}`
    )

    return { addQueue, removeQueue, setQueues, replaceQueues }
>>>>>>> 681bf23 (Fixing lint issues)
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
