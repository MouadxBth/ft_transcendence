import {
	Controller,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Req,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Request } from "express";
import { diskStorage } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { FileUploadService } from "./file-upload.service";

const storageConf = diskStorage({
	destination: "/uploads/avatars",
	filename: (req, file, cb) => {
		req;
		cb(null, `${uuidv4()}${path.parse(file.originalname).ext}`);
	},
});

@Controller("avatar")
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@UseInterceptors(FileInterceptor("file", { storage: storageConf }))
	@Post()
	async addAvatar(
		@Req() req: Request,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 4000000 }),
					new FileTypeValidator({ fileType: "image/jpeg" }),
				],
			})
		)
		file: Express.Multer.File
	) {
		await this.fileUploadService.addAvatar(req, file);
	}

	@Get(":username")
	async getAvatar(@Param("username") username: string) {
		return this.fileUploadService.getAvatar(username);
	}
}
