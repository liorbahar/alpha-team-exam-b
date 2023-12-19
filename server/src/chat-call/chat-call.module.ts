import { Module } from '@nestjs/common';
import { ChatCallService } from './chat-call.service';
import { ChatCallGateway } from './chat-call.gateway';
import { ChatCallController } from './chat-call.controller';

@Module({
  controllers: [ChatCallController],
  providers: [ChatCallService, ChatCallGateway]
})
export class ChatCallModule {}
