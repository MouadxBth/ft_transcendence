import { ChannelStatus } from "@prisma/client";

export class Channel {
    name: string;

    password: string | null;

    topic: string | null;

    status: ChannelStatus;

    ownerId: string;
}
