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
//   import { UserService } from '../user/user.service'
import { Controller } from '@nestjs/common';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class ChatCallGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server = new Server()

  private logger = new Logger('ChatGateway')

  @SubscribeMessage('chat')
  async handleCustumerChatEvent(@MessageBody() payload: any): Promise<any> {
    this.logger.log(payload)
    this.server.to(payload.roomName).emit('chat', payload)
    return payload
  }

  @SubscribeMessage('closeChat')
  async handleCloseCustumerChatEvent(@MessageBody() payload: any): Promise<any> {
    this.logger.log(payload)
    this.server.to(payload.roomName).emit('chat', payload)
    return payload
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(@MessageBody() payload: {socketId: string ,roomName: string} ) {
    if (payload.socketId) {
      this.logger.log(`${payload.socketId} is joining ${payload.roomName}`)
      await this.server.in(payload.socketId).socketsJoin(payload.roomName)
      // this.server.to(payload.roomName).emit('chat', payload)
    //   await this.userService.addUserToRoom(payload.roomName, payload.user)
    }
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`)
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    // await this.userService.removeUserFromAllRooms(socket.id)
    this.logger.log(`Socket disconnected: ${socket.id}`)
  }
}
