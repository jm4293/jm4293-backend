import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway(4000, {
  namespace: 'chatting',
  transports: ['websocket'],
})
export class ChattingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly configService: ConfigService) {}

  handleConnection(client: Socket) {
    console.log('client connected', client.id);

    client.on('set-user', (userSeq: string) => {
      client.data.userSeq = userSeq; // userSeq 저장
      console.log(`userSeq ${userSeq} has been set for client ${client.id}`);
    });
  }

  handleDisconnect(client: Socket) {
    console.log('클라이언트가 연결을 종료했습니다:', client.id);
  }

  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
  //   console.log('받은 메시지:', message);
  //   console.log('보낸 사용자 정보:', client.data.user);
  //   // client.broadcast.emit('message', {
  //   //   user: client.data.user,
  //   //   message: message,
  //   // });
  //   client.broadcast.emit('message', message);
  // }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
    console.log('받은 메시지:', message);
    console.log('보낸 사용자 정보:', client.data.userSeq); // 사용자 정보를 출력

    client.broadcast.emit('message', message); // 메시지 전송
  }
}
