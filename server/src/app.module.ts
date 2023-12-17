import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { ChatCallService } from './chat-call/chat-call.service';
import { ChatCallModule } from './chat-call/chat-call.module';

@Module({
  imports: [AddressModule, ChatCallModule],
  controllers: [AppController],
  providers: [AppService, ChatCallService],
})
export class AppModule {}
