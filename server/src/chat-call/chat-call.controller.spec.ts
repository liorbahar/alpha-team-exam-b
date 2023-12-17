import { Test, TestingModule } from '@nestjs/testing';
import { ChatCallController } from './chat-call.gateway';

describe('ChatCallController', () => {
  let controller: ChatCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatCallController],
    }).compile();

    controller = module.get<ChatCallController>(ChatCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
