import { Injectable } from "@nestjs/common";

@Injectable()
export class OnlineStatusService {
	private readonly online: Map<string, string> = new Map<string, string>();

	onlineStatus(username: string) {
		return this.online.get(username);
	}

	updateOnlineStatus(username: string, status: string) {
		this.online.set(username, status);
	}
}
