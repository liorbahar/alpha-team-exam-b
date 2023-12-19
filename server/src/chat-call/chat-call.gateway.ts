import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets'
  import { Logger } from '@nestjs/common'
  
  import { Server, Socket } from 'socket.io'
import { ChatCallService } from './chat-call.service';
import { ChatEvent, CustumerServiceEvent, User } from './chat.interface';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class ChatCallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatCallService) {}
  
  @WebSocketServer() server: Server = new Server()

  private logger = new Logger('ChatCallGateway')

  @SubscribeMessage('chat')
  async handleCustumerChatEvent(@MessageBody() event: ChatEvent): Promise<any> {
    this.logger.log(event)  
    this.chatService.addMessageToRoom(event.roomName, event.message);
    const eventMessage: CustumerServiceEvent = await this.chatService.getRoomDetails(event.roomName);
    this.server.to('custumerServiceRoom').emit('chat', eventMessage)
    return event
  }

  @SubscribeMessage('closeChat')
  async handleCloseCustumerChatEvent(@MessageBody() event: { roomName: string, chatRoom: string }): Promise<any> {
    this.logger.log(event);
    this.server.to(event.roomName).emit('closeChat', { roomName: event.roomName, chatRoom: event.chatRoom });
    await this.chatService.removeRoom(event.chatRoom)
    return event
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(@MessageBody() event: { socketId: string, roomName: string, user: User} ) {
    this.logger.log(`${event.socketId} is joining ${event.roomName}`);
    if (event.socketId) {
      await this.server.in(event.socketId).socketsJoin(event.roomName);
      if (event.user){
        await this.chatService.addUserToRoom(event.roomName, event.user)
      }
    }
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`)
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this.logger.log(`Socket disconnected: ${socket.id}`)
  }
}
