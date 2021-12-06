export default {
  schema: `
    type ConnectedSocketClient {
      id: String
    }
    type SocketRoom {
      name: String
      totalConnectedClients: Int
      connectedClients: [String]
    }
  `,
  mutations: {
    schema: `
    `,
    resolvers: {},
  },
  queries: {
    schema: `
      connectedSocketClients: [ConnectedSocketClient]
      allRooms: [SocketRoom]
    `,
    resolvers: {
      connectedSocketClients(_: any, args: any, context: any) {
        const socketio = context.wertik.socketio;
        const sockets = socketio.sockets.sockets;
        const arr = Object.keys(sockets).map((c) => {
          return sockets[c];
        });
        return arr;
      },
      allRooms(_: any, args: any, context: any) {
        const socketio = context.wertik.socketio;
        const rooms = socketio.sockets.adapter.rooms;
        const arr = Object.keys(rooms).map((c) => {
          return {
            name: c,
            totalConnectedClients: rooms[c].length,
            connectedClients: Object.keys(rooms[c].sockets),
          };
        });
        return arr;
      },
    },
  },
};
