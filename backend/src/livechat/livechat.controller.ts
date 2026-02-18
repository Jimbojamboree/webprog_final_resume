import { Controller, Get, Query } from '@nestjs/common';
import { LivechatService } from './livechat.service';

@Controller('livechat')
export class LivechatController {
  constructor(private readonly livechatService: LivechatService) {}

  @Get('messages')
  async getMessages(@Query('limit') limit?: number) {
    return this.livechatService.getRecentMessages(limit || 50);
  }
}
