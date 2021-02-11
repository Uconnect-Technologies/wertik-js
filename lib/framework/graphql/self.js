"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
        deleteCache(name: [String]!): String
    `,
        resolvers: {
            deleteCache(_, args, context) {
                context.wertik.cache.del(args.name);
                return `Cache Removed for ${args.name && args.name.join(" ")}`;
            },
        },
    },
    queries: {
        schema: `
      connectedSocketClients: [ConnectedSocketClient]
      allRooms: [SocketRoom]
    `,
        resolvers: {
            connectedSocketClients(_, args, context) {
                const socketio = context.wertik.socketio;
                const sockets = socketio.sockets.sockets;
                const arr = Object.keys(sockets).map((c) => {
                    return sockets[c];
                });
                return arr;
            },
            allRooms(_, args, context) {
                const socketio = context.wertik.socketio;
                const rooms = socketio.sockets.adapter.rooms;
                const arr = Object.keys(rooms).map((c) => {
                    return {
                        name: c,
                        totalConnectedClients: rooms[c].length,
                        connectedClients: Object.keys(rooms[c].sockets)
                    };
                });
                return arr;
            },
        },
    },
};
//# sourceMappingURL=self.js.map