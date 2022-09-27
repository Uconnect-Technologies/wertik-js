import { Server as SocketIOServer } from 'socket.io'
import { defaultPort } from 'src/borrowed/options'
import {
  Server as WebSocketServer,
  ServerOptions as WebSocketServerOptions,
} from 'ws'
import { WertikApp, WertikConfiguration } from '../types'

/**
 * Creates WS instance attaches to http server.
 * @param props see interface WebSocketServerOptions
 * @returns WebSocketServer instance
 */
export const useWebSockets = (props: WebSocketServerOptions = {}) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration
    wertikApp: WertikApp
  }) => {
    if (props.path) {
      console.log(
        `Web Sockets server starting at ws://localhost:${
          configuration.port ?? defaultPort
        }${props.path}`
      )
      return new WebSocketServer({
        server: wertikApp.httpServer,
        ...props,
      })
    } else {
      throw new Error('Path must be passed for useWebSockets')
    }
  }
}

/**
 * Create independent web sockets server that runs on different port.
 * @param props see interface WebSocketServerOptions
 * @returns WebSocketServer instance
 */
export const useIndependentWebSocketsServer = (
  props: WebSocketServerOptions = {}
) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration
    wertikApp: WertikApp
  }) => {
    if (!props.port) {
<<<<<<< HEAD
      console.error('useIndependentWebSocketsServer.port is required')
    } else {
      console.log(
        `Web Sockets server starting at ws://localhost:${props.port}/${
          props.path ?? ''
        }`
      )
      return new WebSocketServer({
        ...props,
      })
    }
=======
      throw new Error('useIndependentWebSocketsServer requires port configured')
    }
    console.log(
      `Web Sockets server starting at ws://localhost:${props.port}/${
        props.path ?? ''
      }`
    )
    return new WebSocketServer({
      ...props,
    })
>>>>>>> 681bf23 (Fixing lint issues)
  }
}

/**
 * Creates sockets io server on current http server.
 * @param props see interface SocketIOServerOptions from socket.io
 * @returns SocketIOServer
 */
export const useSocketIO = (props: any = {}) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration
    wertikApp: WertikApp
  }) => {
    const port = configuration.port ?? defaultPort
<<<<<<< HEAD
    const path: string = props.path ?? '/socket.io'
    console.log(`Socket.IO server starting at http://localhost:${port}${path}`)
=======
    console.log(
      `Socket.IO server starting at http://localhost:${port}${
        props.path ? '/socket.io' : ''
      }`
    )
>>>>>>> 681bf23 (Fixing lint issues)
    return new SocketIOServer(wertikApp.httpServer, props ?? {})
  }
}
