import { HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import z, { ZodError } from "zod";
// import { UserService } from "src/user/user.service";

const profileSchema = z.object({
	username: z.string(),
	photos: z.array(
		z.object({
			value: z.string(),
		})
	),
	displayName: z.string(),
});

type UserProfile = z.infer<typeof profileSchema>;

@Injectable()
export class GithubService {
	constructor(private readonly userService: UserService) {}

	async validate(profile: unknown) {
		let userProfile: UserProfile;

		try {
			userProfile = profileSchema.parse(profile);
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				console.log(`Invalid profile: ${error.message}}`, HttpStatus.BAD_REQUEST);
			} else {
				console.log(`Unexpected issue: ${error}`, HttpStatus.BAD_REQUEST);
			}
			return null;
		}

		let user;

		try {
			user = await this.userService.findOne(userProfile.username);
		} catch (error: unknown) {
			user = await this.handleFirstTime(userProfile);
		}

		const { twoFactorAuthenticationSecret, ...result } = user;

		return result;
	}

	async handleFirstTime(profile: UserProfile) {
		const avatar =
			profile.photos[0]?.value ||
			encodeURI(`https://robohash.org/${profile.displayName.toLocaleLowerCase()}`);

		return await this.userService.create({
			username: profile.username,
			password: undefined,
			firstName: profile.displayName.split(" ")[0] || "unknown",
			lastName: profile.displayName.split(" ")[1] || "unknown",
			avatar: avatar,
		});
	}
}
