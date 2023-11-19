import { HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import z, { ZodError } from "zod";

const profileSchema = z.object({
	id: z.string(),
	displayName: z.string(),
	photos: z.array(
		z.object({
			value: z.string(),
		})
	),
	name: z
		.object({
			givenName: z.string().optional(),
			familyName: z.string().optional(),
		})
		.optional(),
});

type UserProfile = z.infer<typeof profileSchema>;

@Injectable()
export class GoogleService {
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
			user = await this.userService.findOne(userProfile.id);
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
			username: profile.id,
			password: undefined,
			firstName: profile.name?.givenName || "unknown",
			lastName: profile.name?.familyName || "unknown",
			avatar: avatar,
		});
	}
}
