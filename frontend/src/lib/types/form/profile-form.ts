import { z } from "zod";

const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"];

export const profileFormSchema = z
	.object({
		nickname: z.string(),
		firstname: z.string(),
		lastname: z.string(),
		password: z.string(),
		confirmpassword: z.string(),
		avatar: z
			.custom<FileList>((val) => val instanceof FileList, "Required")
			.refine((list) => list.length === 1, "One image is required!")
			.refine(
				(list) => list[0] && list[0].size <= MAX_IMAGE_SIZE,
				`Image size should be less than 5 MB.`
			)
			.refine(
				(list) => list[0] && ALLOWED_IMAGE_TYPES.includes(list[0].type),
				"Only these types are allowed .jpg, .jpeg, .png .gif and .webp"
			)
			.optional(),
		banner: z
			.custom<FileList>((val) => val instanceof FileList, "Required")
			.refine((list) => list.length === 1, "One image is required!")
			.refine(
				(list) => list[0] && list[0].size <= MAX_IMAGE_SIZE,
				`Image size should be less than 5 MB.`
			)
			.refine(
				(list) => list[0] && ALLOWED_IMAGE_TYPES.includes(list[0].type),
				"Only these types are allowed .jpg, .jpeg, .png .gif and .webp"
			)
			.optional(),
	})
	.refine((data) => data.password === data.confirmpassword, {
		message: "Passwords don't match",
		path: ["confirmpassword"],
	});

export type ProfileFormType = z.infer<typeof profileFormSchema>;
