import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
	HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { type Request } from "express";

@ApiTags("User")
@Controller("user")
@UseGuards(AuthenticatedGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiOperation({ summary: "Fetch all users", description: "Used to fetch all Users" })
	@ApiResponse({ type: Array<User>, status: HttpStatus.OK, description: "Successful retrieval" })
	async findAll() {
		const collection = await this.userService.findAll();
		return collection.map(({ twoFactorAuthenticationSecret, password, ...result }) => result);
	}

	@Get("search/:nickname")
	@ApiOperation({ summary: "Fetch all users", description: "Used to fetch all Users" })
	@ApiResponse({ type: Array<User>, status: HttpStatus.OK, description: "Successful retrieval" })
	async search(@Param("nickname") nickname: string) {
		const collection = await this.userService.search(nickname);
		return collection.map(({ twoFactorAuthenticationSecret, password, ...result }) => result);
	}

	@Get(":id")
	@ApiOperation({
		summary: "Fetch a User by username",
		description: "Used to fetch a User by username",
	})
	@ApiResponse({ type: User, status: HttpStatus.OK, description: "Successful retrieval" })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User does not exist" })
	async findOne(@Param("id") id: string) {
		const { twoFactorAuthenticationSecret, password, ...result } =
			await this.userService.findOne(id);
		return result;
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Update the logged in User",
		description: "Used to update the logged in User",
	})
	@ApiResponse({ type: User, status: HttpStatus.OK, description: "Update successful" })
	@ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Not allowed to update another User" })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "If the user does not exist, a Not Found will be returned",
	})
	async update(@Req() req: Request, @Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		await this.userService.update(req, id, updateUserDto);
		return req.user;
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Delete the logged in User",
		description: "Used to delete the logged in User",
	})
	@ApiResponse({ type: User, status: HttpStatus.OK, description: "Successful deletion" })
	@ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Not allowed to delete another User" })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User does not exist" })
	async remove(@Req() req: Request, @Param("id") id: string) {
		const result = await this.userService.remove(req, id);
		return result;
	}
}
