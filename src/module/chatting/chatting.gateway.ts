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
import * as cookie from 'cookie';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway(4000, {
  namespace: 'chatting',
  transports: ['websocket'],
})
export class ChattingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly configService: ConfigService) {}

  // async handleConnection(client: Socket) {
  //   try {
  //     const cookies = cookie.parse(client.handshake.headers.cookie || '');
  //     const token = cookies['jwt-token'];
  //
  //     if (!token) {
  //       console.log('JWT 토큰이 없으므로 연결을 종료합니다.');
  //       client.disconnect();
  //       return;
  //     }
  //
  //     const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET_KEY'));
  //     client.data.user = decoded;
  //
  //     console.log('사용자 정보:', client.data.user);
  //   } catch (error) {
  //     console.error('JWT 검증 실패:', error);
  //     client.disconnect();
  //   }
  // }

  handleConnection(client: Socket) {
    console.log('client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('클라이언트가 연결을 종료했습니다:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
    console.log('받은 메시지:', message);
    console.log('보낸 사용자 정보:', client.data.user);
    client.broadcast.emit('message', {
      user: client.data.user,
      message: message,
    });
  }
}
