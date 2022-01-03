import socketClient from 'socket.io-client';
import * as dashboardActions from '../../store/actions/dashboardActions'
import store from '../../store/store';

const SERVER = 'http://localhost:5000'

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
}

let socket;

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER);

  socket.on('connection', () => {
    console.log('succesfully connected with wss server');
    console.log(socket.id);
  });

  socket.on('broadcast', (data) => {
    broadcastEventEvents(data);
  })
}
  ;

export const registerNewUser = (username) => {
  socket.emit("register-new-user", {
    username: username,
    socketId: socket.id,
  });
};

const broadcastEventEvents = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      // filter lọc ra những thằng user trên server 
      const activeUsers = data?.activeUsers.filter((activeUser) => activeUser.socketId !== socket.id);
      store.dispatch(dashboardActions.setActiveUsers(activeUsers));
      break;
    default:
      break;
  }
}