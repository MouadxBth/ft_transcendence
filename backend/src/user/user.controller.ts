import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
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
	@ApiResponse({ type: Array<User>, status: 200, description: "Successful retrieval" })
	async findAll() {
		const collection = await this.userService.findAll();
		return collection.map(({ twoFactorAuthenticationSecret, password, ...result }) => result);
	}

	@Get(":id")
	@ApiOperation({
		summary: "Fetch a User by username",
		description: "Used to fetch a User by username",
	})
	@ApiResponse({ type: User, status: 200, description: "Successful retrieval" })
	@ApiResponse({ status: 404, description: "User does not exist" })
	async findOne(@Param("id") id: string) {
		const { twoFactorAuthenticationSecret, password, ...result } =
			await this.userService.findOne(id);
		return result;
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Update a User by username (FOR TESTING PURPOSES)",
		description: "Used to update a User by username (FOR TESTING PURPOSES)",
	})
	@ApiResponse({ type: User, status: 200, description: "Update successful" })
	@ApiResponse({
		status: 404,
		description: "If the user does not exist, a Not Found will be returned",
	})
	async update(@Req() req: Request, @Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		const { twoFactorAuthenticationSecret, password, ...result } = await this.userService.update(
			req,
			id,
			updateUserDto
		);
		return result;
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Delete a User by username (FOR TESTING PURPOSES)",
		description: "Used to delete a User by username (FOR TESTING PURPOSES)",
	})
	@ApiResponse({ type: User, status: 200, description: "Successful deletion" })
	@ApiResponse({ status: 404, description: "User does not exist" })
	async remove(@Req() req: Request, @Param("id") id: string) {
		const { twoFactorAuthenticationSecret, password, ...result } = await this.userService.remove(
			req,
			id
		);
		return result;
	}
}
