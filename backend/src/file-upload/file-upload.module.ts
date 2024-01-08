import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { FileUploadService } from "./file-upload.service";

@Module({
	imports: [MulterModule],
	controllers: [FileUploadController],
	providers: [FileUploadService],
})
export class FileUploadController {}
