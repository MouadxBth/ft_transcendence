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
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Request } from "express";
import { diskStorage } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { FileUploadService } from "./file-upload.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";

const storageConf = diskStorage({
	destination: "/uploads/avatars",
	filename: (req, file, cb) => {
		req;
		cb(null, `${uuidv4()}${path.parse(file.originalname).ext}`);
	},
});

@Controller("avatar")
@UseGuards(AuthenticatedGuard)
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Post()
	@UseInterceptors(FileInterceptor("file", { storage: storageConf }))
	async addAvatar(
		@Req() req: Request,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 4000000 }),
					new FileTypeValidator({ fileType: "image/(jpeg|gif|png)" }),
				],
			})
		)
		file: Express.Multer.File
	) {
		return await this.fileUploadService.addAvatar(req, file);
	}

	@Get(":username")
	async getAvatar(@Param("username") username: string) {
		return this.fileUploadService.getAvatar(username);
	}
}
