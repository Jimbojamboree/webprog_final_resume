import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestbookComment } from './guestbook-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class GuestbookService {
  constructor(
    @InjectRepository(GuestbookComment)
    private readonly commentRepo: Repository<GuestbookComment>,
  ) {}

  async create(dto: CreateCommentDto): Promise<GuestbookComment> {
    const comment = this.commentRepo.create(dto);
    return this.commentRepo.save(comment);
  }

  async findAll(): Promise<GuestbookComment[]> {
    return this.commentRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<GuestbookComment> {
    return this.commentRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.commentRepo.delete(id);
  }
}
