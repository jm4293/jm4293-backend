import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4000, {
  namespace: 'chatting',
  // cors: { origin: 'http://localhost:3000' },
  transports: ['websocket'],
})
export class ChattingGateway {
  @WebSocketServer()
  server: Server;

  constructor() {}

  @SubscribeMessage('connect')
  handleConnection(client: Socket) {
    console.log('client connected', client.id);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
    console.log('받은 메시지:', message);
    client.broadcast.emit('message', message); // 다른 클라이언트에게 메시지 방송
  }
}
