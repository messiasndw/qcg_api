
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';

@WebSocketGateway(  )
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket, ...args: any[]){
        console.log(client.id)
    }

    handleDisconnect(){
        console.log("disconected")
    }

    @SubscribeMessage('events')
    handleEvent(@ConnectedSocket() client: Socket, data: string): string {
        console.log(client.id)
        client.emit('events','kkkkkkkkkkkkkkkkkk')
        return data
    }

    @SubscribeMessage('identity')
    identity(@MessageBody() data: number){
        console.log(data)
    }
}