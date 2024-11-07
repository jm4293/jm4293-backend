import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway(8081, { namespace: '/socket/chatting', transports: ['websocket'] })
export class ChattingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChattingGateway.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(server: Server) {
    console.log('socket server init', server);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      console.log('client connected', client.id);

      const accessToken = Object.fromEntries(
        client.handshake.headers.cookie.split('; ').map((cookie) => cookie.split('=')),
      )['accessToken'];

      const verifiedAccessToken = this.jwtService.verify(accessToken);

      if (!verifiedAccessToken) {
        this.logger.error(`${client.id} 연결 강제 종료, status: 401, 토큰이 유효하지 않습니다.`);
        client.disconnect();
        return;
      }

      client.data.userSeq = verifiedAccessToken['userSeq'];

      console.log('client accessToken verifiedAccessToken', verifiedAccessToken);

      // jwt 검증을 통한 인증 작업 로직 시작

      client.join('chatting');
    } catch (e) {
      this.logger.error(`${client.id} 연결 강제 종료, status: ${e.status}, ${e.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('클라이언트가 연결을 종료했습니다:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket) {
    console.log('받은 메시지:', message);
    console.log('보낸 사용자 정보:', client.data.userSeq);

    client.broadcast.emit('message', message);
  }
}
