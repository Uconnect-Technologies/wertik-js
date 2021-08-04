export const useWebSockets = (props) => {
    const WebSocketServer = require('ws').Server;
    return new WebSocketServer(props);
}