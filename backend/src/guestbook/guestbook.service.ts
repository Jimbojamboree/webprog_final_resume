import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { GuestbookComment } from './guestbook-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class GuestbookService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) { }

  async create(dto: CreateCommentDto): Promise<GuestbookComment> {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert(dto)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      ...data,
      createdAt: new Date(data.created_at),
    } as GuestbookComment;
  }

  async findAll(): Promise<GuestbookComment[]> {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map(item => ({
      ...item,
      createdAt: new Date(item.created_at),
    })) as GuestbookComment[];
  }

  async findOne(id: number): Promise<GuestbookComment | null> {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;

    return {
      ...data,
      createdAt: new Date(data.created_at),
    } as GuestbookComment;
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}
