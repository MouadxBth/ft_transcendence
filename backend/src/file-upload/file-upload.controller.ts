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
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

const storageConf = diskStorage({
	destination: "/uploads/avatars",
	filename: (req, file, cb) => {
		req;
		cb(null, `${uuidv4()}${path.parse(file.originalname).ext}`);
	},
});
@ApiTags("avatar")
@Controller("avatar")
@UseGuards(AuthenticatedGuard)
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Post()
	@UseInterceptors(FileInterceptor("file", { storage: storageConf }))
	@ApiConsumes("multipart/form-data")
	@ApiOperation({ summary: "Upload avatar for the user" })
	@ApiBody({ description: "Image file", type: Object })
	@ApiResponse({ status: 200, description: "Successfully uploaded avatar" })
	@ApiResponse({ status: 400, description: "Bad Request - Invalid file or file type" })
	async addAvatar(
		@Req() req: Request,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 5242880 }),
					new FileTypeValidator({ fileType: "image/(jpeg|jpg|webp|gif|png)" }),
				],
			})
		)
		file: Express.Multer.File
	) {
		return await this.fileUploadService.addAvatar(req, file);
	}

	@Get(":username")
	@ApiOperation({ summary: "Get avatar for the specified user" })
	@ApiResponse({ status: 200, description: "Successfully retrieved avatar" })
	@ApiResponse({ status: 400, description: "Bad Request - No avatar found for the user" })
	async getAvatar(@Param("username") username: string) {
		return this.fileUploadService.getAvatar(username);
	}
}
