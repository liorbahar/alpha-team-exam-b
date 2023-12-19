import { Injectable } from '@nestjs/common';
import { CustumerServiceEvent, Room, User } from './chat.interface';

@Injectable()
export class ChatCallService {
    private rooms: Room[] = [];

  async addRoom(roomName: string, host: User): Promise<void> {
    const room: number = await this.getRoomByName(roomName)
    if (room === -1) {
        const room: Room = {
            name: roomName,
            startDate: new Date().toLocaleString(),
            users: [host],
            host: host,
            messages: []
        }
        await this.rooms.push(room);
    }
  }

  async addMessageToRoom(roomName: string, message: string): Promise<void> {
    const roomIndex: number = await this.getRoomByName(roomName);
    if (roomIndex !== -1) {
        this.rooms[roomIndex].messages.push(message);
    }
  }

  async getRoomDetails(roomName: string): Promise<CustumerServiceEvent> {
    const roomIndex: number = await this.getRoomByName(roomName);
    if (roomIndex !== -1) {
        const room: Room = this.rooms[roomIndex];
        return this.parseRoom(room); 
    }
     
  }

  async removeRoom(roomName: string): Promise<void> {
    const findRoom: number = await this.getRoomByName(roomName);
    if (findRoom !== -1) {
      this.rooms = this.rooms.filter((room) => room.name !== roomName);
    }
  }

  async addUserToRoom(roomName: string, user: User): Promise<void> {
    const roomIndex: number = await this.getRoomByName(roomName);
    if (roomIndex === -1) {
        this.addRoom(roomName, user);
    } else {
        this.rooms[roomIndex].users.push(user);
    }
  }

  async getRooms(): Promise<CustumerServiceEvent[]> {
    return this.rooms.map(room => this.parseRoom(room))
  } 

  private parseRoom(room: Room): CustumerServiceEvent{
    return {
      roomName: room.name,
      firstName: room.host.firstName,
      lastName: room.host.lastName,
      email: room.host.email,
      address: room.host.address,
      startDate: room.startDate,
      totalMessage: room.messages.length,
      lastMesage: room.messages[room.messages.length - 1]
    } 
  }

  private async getRoomByName(roomName: string): Promise<number> {
    const roomIndex: number = this.rooms.findIndex((room) => room?.name === roomName)
    return roomIndex
  }
}
