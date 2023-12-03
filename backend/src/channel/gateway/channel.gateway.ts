import { SubscribeMessage, 
  WebSocketGateway, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  ConnectedSocket,
  MessageBody, 
  WebSocketServer} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from '../dto/message.dto';
import { User } from '@prisma/client';
import { ChannelMessageService } from '../channel-message.service';
import { ChannelService } from '../channel.service';

@WebSocketGateway({
namespace: "channel",
})
export class ChannelGateway implements OnGatewayConnection, OnGatewayDisconnect{

  constructor(private readonly channelMessageService: ChannelMessageService, 
    private readonly channelService: ChannelService){};

  @WebSocketServer()
  private readonly server: Server;

  async handleConnection(@ConnectedSocket() client: Socket) {
    let user = {
      username: "username",
    } as User;
    console.log("socket with id:" + client.id + " is connected");
    //rejoin the user to all the rooms of the channels they're a member of
    (await this.channelService.findUserChannels(user)).map((channel) => client.join(channel.name));
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log("socket with id:" + client.id + " is disconnected");
  }

  @SubscribeMessage('send_message')
  async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() messageBody: MessageDto) {

    // hard coded the user object, will change later when we have gateway protection on
    client;
    let user = {
      username: "username",
    } as User;
    await this.channelMessageService.verifyMessage(messageBody, user);
    const message = await this.channelMessageService.createMessage(messageBody, user);
    this.server.to(messageBody.channelName).emit("recieve_message", message);
  }

  // for debugging purposes
  @SubscribeMessage("receive_message")
  recieveMessage(@ConnectedSocket() client: Socket, @MessageBody() message: string){
    console.log("socket with id:" + client.id + " sent this: " + message);
  }

  @SubscribeMessage("join_room")
  joinRoom(@ConnectedSocket() client: Socket, @MessageBody() channelName: string)
  {
    client.join(channelName);
    this.server.to(channelName).emit("client_joined_channel", client.id)
  }

  @SubscribeMessage("leave_room")
  leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() channelName: string)
  {
    client.leave(channelName);
    this.server.to(channelName).emit("client_left_channel", client.id)
  }
}
