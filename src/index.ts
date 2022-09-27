import get from 'lodash.get'
import express from 'express'
import store from './store'
import {
  applyRelationshipsFromStoreToDatabase,
  applyRelationshipsFromStoreToGraphql,
} from './database'
import { emailSender } from './mailer/index'
import http from 'http'
import { WertikConfiguration, WertikApp } from './types'
import { initializeBullBoard } from './queue/index'
import path from 'path'
import has from 'lodash.has'
import { defaultPort } from './borrowed/options'
// eslint-disable-next-line
const packageInfo = require(path.resolve('./package.json'))

export * from './database'
export * from './modules/modules'
export * from './graphql'
export * from './mailer'
export * from './cronJobs'
export * from './storage'
export * from './helpers/modules/backup'
export * from './sockets'
export * from './queue'
export * from './redis'
export * from './logger'

const Wertik: (
  configuration?: WertikConfiguration
) => Promise<WertikApp> = async (configuration: WertikConfiguration) => {
  configuration = configuration || {}
  return await new Promise((resolve, reject) => {
    try {
      configuration.appEnv = configuration.appEnv ?? 'local'
      const wertikApp: WertikApp = {
        appEnv: configuration.appEnv,
        port: 1200,
        modules: {},
        models: {},
        database: {},
        mailer: {},
        graphql: {},
        sockets: {},
        cronJobs: {},
        storage: {},
        queue: {
          jobs: {},
          bullBoard: {},
        },
        redis: {},
        logger: null,
      }

      const port: number = get(configuration, 'port', 1200)
      const skip: boolean = get(configuration, 'skip', false)
      const expressApp = get(configuration, 'express', express())
      const httpServer = http.createServer(expressApp)

      wertikApp.httpServer = httpServer
      wertikApp.express = expressApp
      wertikApp.port = configuration.port ?? defaultPort

      if (configuration?.mailer?.instances) {
        for (const mailName of Object.keys(
          configuration.mailer.instances || {}
        )) {
          wertikApp.mailer[mailName] =
            configuration.mailer.instances[mailName]()
        }
      }

      if (configuration.storage != null) {
        for (const storageName of Object.keys(configuration.storage || {})) {
          wertikApp.storage[storageName] = configuration.storage[storageName]({
            configuration,
            wertikApp,
          })
        }
      }

      if (configuration.cronJobs != null) {
        for (const cronName of Object.keys(configuration.cronJobs || {})) {
          wertikApp.cronJobs[cronName] = configuration.cronJobs[cronName]({
            configuration,
            wertikApp,
          })
        }
      }

      if (configuration.sockets != null) {
        for (const socketName of Object.keys(configuration.sockets || {})) {
          wertikApp.sockets[socketName] = configuration.sockets[socketName]({
            configuration,
            wertikApp,
          })
        }
      }

      if (configuration.database != null) {
        for (const databaseName of Object.keys(configuration.database || {})) {
          try {
            wertikApp.database[databaseName] =
              configuration.database[databaseName]()
          } catch (e) {
            throw new Error(e)
          }
        }
      }

      if (configuration.modules != null) {
        for (const moduleName of Object.keys(configuration.modules || {})) {
          wertikApp.modules[moduleName] = configuration.modules[moduleName]({
            store,
            configuration,
            app: wertikApp,
          })
        }
      }

      if (configuration?.queue?.jobs != null) {
        for (const queueName of Object.keys(configuration?.queue?.jobs || {})) {
          wertikApp.queue.jobs[queueName] =
            configuration.queue.jobs[queueName]()
        }
      }

      if (configuration?.queue?.options?.useBullBoard) {
        wertikApp.queue.bullBoard = initializeBullBoard({
          wertikApp,
          configuration,
        })
      }

      if (configuration.redis != null) {
        for (const redisName of Object.keys(configuration.redis || {})) {
          wertikApp.redis[redisName] = configuration.redis[redisName]({
            wertikApp,
            configuration,
          })
        }
      }

      if (configuration.logger) {
        wertikApp.logger = configuration.logger
      }

      applyRelationshipsFromStoreToDatabase(store, wertikApp)
      applyRelationshipsFromStoreToGraphql(store, wertikApp)

      expressApp.get('/w/info', function (req, res) {
        res.json({
          message: 'You are running wertik-js v3',
          version: packageInfo.version,
        })
      })

      wertikApp.sendEmail = emailSender({
        wertikApp,
        configuration,
      })

      if (configuration.graphql != null) {
        wertikApp.graphql = configuration.graphql({
          wertikApp,
          store,
          configuration,
          expressApp,
        })
      }

      expressApp.use(async function (req, _res, next) {
        req.wertik = wertikApp
        next()
      })

      if (!has(process, 'env.TEST_MODE', false)) {
        setTimeout(() => {
          if (!skip) {
            httpServer.listen(port, () => {
              console.log(`Wertik JS app listening at http://localhost:${port}`)
            })
          }
          resolve(wertikApp)
        }, 500)
      } else {
        resolve(wertikApp)
      }
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

export default Wertik
