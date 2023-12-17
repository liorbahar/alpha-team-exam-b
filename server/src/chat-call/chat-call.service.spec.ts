import { Test, TestingModule } from '@nestjs/testing';
import { ChatCallService } from './chat-call.service';

describe('ChatCallService', () => {
  let service: ChatCallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatCallService],
    }).compile();

    service = module.get<ChatCallService>(ChatCallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
