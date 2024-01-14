import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { FileUploadService } from "./file-upload.service";
import { FileUploadController } from "./file-upload.controller";
import { UserModule } from "src/user/user.module";

@Module({
	imports: [MulterModule, UserModule],
	controllers: [FileUploadController],
	providers: [FileUploadService],
})
export class FileUploadModule {}
