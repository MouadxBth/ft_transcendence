import axios from "axios"
import { User, userSchema } from "../types/user/user";

export const userEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
	withCredentials: true
})

export async function fetchUser(username: string) : Promise<User> {
	const res = userEndpoint.get(`/${username}`);
	return res.then((res) => {
		const parsedRes = userSchema.safeParse(res.data); 
		if (!parsedRes.success) {
			throw parsedRes.error;
		}
		return parsedRes.data;
	})
}

export default fetchUser;