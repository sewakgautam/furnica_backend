import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server, Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const chat = new Chat();
    chat.message = createChatDto.message;
    chat.senderId = createChatDto.from;
    chat.receiverId = createChatDto.to;
    await this.chatRepository.save(chat);
    this.server.emit('chat', chat);
    return chat;
  }

  async findAll() {
    return await this.chatRepository.find();
  }

  async findOne(id: string) {
    return await this.chatRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const chat = await this.chatRepository.findOne({ where: { id } });
    await this.chatRepository.remove(chat);
    return chat;
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client}`);
  }
}
