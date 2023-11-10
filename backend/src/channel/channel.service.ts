import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Channel } from './entities/channel.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class ChannelService {
  constructor (private readonly prisma: PrismaService) {}

  async create(createChannelDto: CreateChannelDto):Promise<Channel> {
    const channelResult =  await this.prisma.channel.findUnique({where: {name: createChannelDto.name}});
    const userResult = await this.prisma.user.findUnique({where: {username: createChannelDto.owner}});

    if (channelResult)
    {
      throw new HttpException("channelname already taken!", HttpStatus.BAD_REQUEST);
    }
    if (!userResult)
    {
      throw new HttpException("username doesn't exist!", HttpStatus.BAD_REQUEST);
    }
    if (createChannelDto.status == "PROTECTED" && !createChannelDto.password)
    {
      throw new HttpException("password must be set for protected channels.", HttpStatus.BAD_REQUEST);
    }
    if (createChannelDto.status == "PUBLIC" && createChannelDto.password)
    {
      throw new HttpException("no password is required for public channels.", HttpStatus.BAD_REQUEST);
    }
    const {owner, password,  ...otherInfo} = createChannelDto;

     let passhash;
     if (password)
     {
      passhash = await bcrypt.hash(password, 10);
     }

    return this.prisma.channel.create({data: {
      ...otherInfo,
      password: passhash,
      owner: {connect : {
        username: createChannelDto.owner, 
      }}
    }})
  }

   async findAll():Promise<Channel[]> {
    return await this.prisma.channel.findMany();
  }

  async findOne(id: string):Promise<Channel> {
     const channelResult = await this.prisma.channel.findUnique({where: {name: id}})

     if (!channelResult)
     {
      throw new HttpException("no such channel with that name!", HttpStatus.BAD_REQUEST)
     }

     return channelResult;
  }

  async update(id: string, updateChannelDto: UpdateChannelDto):Promise<Channel> {
    let channelResult = await this.prisma.channel.findUnique({where: {name: id}});

     if (!channelResult)
     {
      throw new HttpException("no such channel with that name!", HttpStatus.BAD_REQUEST)
     }

     if (!updateChannelDto.owner || updateChannelDto.owner != channelResult.ownerId)
     {
      throw new HttpException("incorrect owner of the channel!", HttpStatus.BAD_REQUEST)
     }
    
    if (updateChannelDto.status == "PROTECTED" && !updateChannelDto.password)
    {
      throw new HttpException("password must be set for protected channels.", HttpStatus.BAD_REQUEST);
    }
    if (channelResult.status == "PUBLIC" && updateChannelDto.password)
    {
      throw new HttpException("no password is required for public channels.", HttpStatus.BAD_REQUEST);
    }
    if (updateChannelDto.name)
    {
      channelResult = await this.prisma.channel.findUnique({where: {name: updateChannelDto.name}});

      if (channelResult)
      {
        throw new HttpException("channelname already taken!", HttpStatus.BAD_REQUEST);
      }
    }
    const {owner, password, ...otherInfo} = updateChannelDto;

     let passhash;
     if (password)
     {
      passhash = await bcrypt.hash(password, 10);
     }

     return await this.prisma.channel.update({
      where: {name: id},
      data: {
        ...otherInfo,
        password: passhash,
        owner: {connect: {
          username: owner, 
        }
      },
     }})
    }

  async remove(id: string):Promise<Channel> {
    // add ownership checks
    const channelResult = await this.prisma.channel.findUnique({where: {name: id}});

     if (!channelResult)
     {
      throw new HttpException("no such channel with that name!", HttpStatus.BAD_REQUEST)
     }

     return await this.prisma.channel.delete({where: {name: id}});
  }
}
