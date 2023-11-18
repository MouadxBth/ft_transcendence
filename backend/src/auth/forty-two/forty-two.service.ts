import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import z, { ZodError } from "zod";

const profileSchema = z.object({
	username: z.string(),
	_json: z.object({
		image: z.object({
			link: z.string().optional(),
		}),
	}),
	name: z
		.object({
			givenName: z.string().optional(),
			familyName: z.string().optional(),
		})
		.optional(),
	displayName: z.string(),
});

type UserProfile = z.infer<typeof profileSchema>;

@Injectable()
export class FortyTwoService {
	constructor(private readonly userService: UserService) {}

	async validate(profile: unknown) {
		let userProfile: UserProfile;

		try {
			userProfile = profileSchema.parse(profile);
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				throw new HttpException(`Invalid profile: ${error.message}}`, HttpStatus.BAD_REQUEST);
			} else {
				throw new HttpException(`Unexpected issue: ${error}`, HttpStatus.BAD_REQUEST);
			}
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
			profile._json.image.link ||
			encodeURI(`https://robohash.org/${profile.displayName.toLocaleLowerCase()}`);

		return await this.userService.create({
			username: profile.username,
			password: undefined,
			firstName: profile.name?.givenName || "unknown",
			lastName: profile.name?.familyName || "unknown",
			avatar: avatar,
		});
	}
}
