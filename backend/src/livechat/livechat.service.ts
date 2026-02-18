import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message.entity';

@Injectable()
export class LivechatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepo: Repository<ChatMessage>,
  ) {}

  async saveMessage(username: string, message: string): Promise<ChatMessage> {
    const chatMessage = this.chatRepo.create({ username, message });
    return this.chatRepo.save(chatMessage);
  }

  async getRecentMessages(limit = 50): Promise<ChatMessage[]> {
    return this.chatRepo.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
