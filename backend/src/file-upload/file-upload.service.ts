import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import type { Request } from "express";
import * as fs from "fs";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class FileUploadService {
	constructor(private readonly userService: UserService) {}

	async addAvatar(req: Request, file: Express.Multer.File) {
		const authenticatedUser = (req.user as AuthenticatedUser).user;
		if (
			authenticatedUser.avatar &&
			!(authenticatedUser.avatar.includes("http") || authenticatedUser.avatar.includes("https"))
		) {
			try {
				fs.accessSync(`../${authenticatedUser.avatar}`, fs.constants.F_OK);
				fs.unlinkSync(`../${authenticatedUser.avatar}`);
			} catch (err) {}
		}

		this.userService.update(req, authenticatedUser.username, {
			avatar: `${file.destination}/${file.filename}`,
		});
	}

	async getAvatar(username: string) {
		const user = await this.userService.findOne(username);

		if (!user.avatar || user.avatar.includes("http") || user.avatar.includes("https"))
			throw new HttpException("No profile picture was uploaded!", HttpStatus.BAD_REQUEST);

		const image = fs.readFileSync(`../${(await user).avatar}`);
		const base64Image = "data:image/jpeg;base64," + image.toString("base64");

		return base64Image;
	}
}
