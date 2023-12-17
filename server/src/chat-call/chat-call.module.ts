import { Module } from '@nestjs/common';
import { ChatCallService } from './chat-call.service';
import { ChatCallGateway } from './chat-call.gateway';

@Module({
  controllers: [],
  providers: [ChatCallService, ChatCallGateway]
})
export class ChatCallModule {}
