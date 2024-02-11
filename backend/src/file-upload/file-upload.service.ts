import { Injectable, StreamableFile } from "@nestjs/common";
import type { Request, Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class FileUploadService {
	constructor(private readonly userService: UserService) {}

	async addAvatar(req: Request, file: Express.Multer.File) {
		const authenticatedUser = (req.user as AuthenticatedUser).user;

		return await this.userService.update(req, authenticatedUser.username, {
			avatar: `${file.filename}`,
		});
	}

	async addBanner(req: Request, file: Express.Multer.File) {
		const authenticatedUser = (req.user as AuthenticatedUser).user;

		return await this.userService.update(req, authenticatedUser.username, {
			banner: `${file.filename}`,
		});
	}

	async getAvatar(path: string, response: Response) {
		const stream = createReadStream(join(process.cwd(), `/uploads/avatars/${path}`));

		response.set({
			"Content-Disposition": `inline; filename="${path}"`,
			"Content-Type": `image/${path.substring(path.search("(jpeg|jpg|webp|gif|png)"))}`,
		});
		return new StreamableFile(stream);
	}

	async getBanner(path: string, response: Response) {
		const stream = createReadStream(join(process.cwd(), `/uploads/banners/${path}`));

		response.set({
			"Content-Disposition": `inline; filename="${path}"`,
			"Content-Type": `image/${path.substring(path.search("(jpeg|jpg|webp|gif|png)"))}`,
		});
		return new StreamableFile(stream);
	}
}
