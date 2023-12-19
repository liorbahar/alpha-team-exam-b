import { Controller, Get } from '@nestjs/common';
import { ChatCallService } from './chat-call.service';
import { CustumerServiceEvent } from './chat.interface';

@Controller('chat')
export class ChatCallController {
    constructor(private chatService: ChatCallService) {}

    @Get()
    public async getAllProcesses(): Promise<CustumerServiceEvent[]> {
        return await this.chatService.getRooms();
    }
}
