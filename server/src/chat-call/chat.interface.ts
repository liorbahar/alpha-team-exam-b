import { Socket } from "socket.io"

export type User = {
    firstName: string
    lastName: string
    email: string
    address: string
  }

  
  export type Room = {
    name: string
    host: User,
    startDate: string
    messages: string[]
    users: User[]
  }

  export type CustumerServiceEvent = {
    roomName: string,
    startDate: string
    totalMessage: number
    lastMesage: string
  } & User
  
  export type JoinRoomEvent = {
    socketId: string,
    roomName: string,
    user?: User
  }

  export type ChatEvent = {
    roomName: string
    message: string
  }