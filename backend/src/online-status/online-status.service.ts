import { Injectable } from "@nestjs/common";

@Injectable()
export class OnlineStatusService {
	private readonly online: Set<string> = new Set<string>();

	onlineStatus(username: string) {
		return this.online.has(username);
	}

	updateOnlineStatus(username: string, status: boolean) {
		if (status) {
			this.online.add(username);
			return;
		}
		this.online.delete(username);
	}
}
