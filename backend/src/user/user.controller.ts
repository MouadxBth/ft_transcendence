import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

@ApiTags("user")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiOperation({ summary: "Create a new User", description: "Used to create a new User" })
	@ApiBody({ type: CreateUserDto, description: "D.T.O for creating a new User" })
	@ApiResponse({ status: 201, description: "User created successfully", type: User })
	@ApiResponse({ status: 400, description: "Bad request" })
	async create(@Body() createUserDto: CreateUserDto) {
		const { twoFactorAuthenticationSecret, ...result } =
			await this.userService.create(createUserDto);
		return result;
	}

	@Get()
	@ApiOperation({ summary: "Fetch all users", description: "Used to fetch all Users" })
	@ApiResponse({ status: 200, description: "Successful retrieval", type: Array<string> })
	async findAll() {
		const collection = await this.userService.findAll();
		return collection.map(({ twoFactorAuthenticationSecret, ...result }) => result);
	}

	@Get(":id")
	@ApiOperation({
		summary: "Fetch User by username",
		description: "Used to fetch a User by username",
	})
	@ApiResponse({ status: 200, description: "Successful retrieval", type: User })
	@ApiResponse({ status: 404, description: "User does not exist" })
	async findOne(@Param("id") id: string) {
		const { twoFactorAuthenticationSecret, ...result } = await this.userService.findOne(id);
		return result;
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Update User by username",
		description: "Used to update a User by username",
	})
	@ApiResponse({ status: 200, description: "Update successful", type: User })
	@ApiResponse({ status: 404, description: "User does not exist" })
	async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		const { twoFactorAuthenticationSecret, ...result } = await this.userService.update(
			id,
			updateUserDto
		);
		return result;
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Delete User by username",
		description: "Used to delete a User by username",
	})
	@ApiResponse({ status: 200, description: "Successful deletion", type: User })
	@ApiResponse({ status: 404, description: "User does not exist" })
	async remove(@Param("id") id: string) {
		const { twoFactorAuthenticationSecret, ...result } = await this.userService.remove(id);
		return result;
	}
}
