import { User, userSchema } from "@/lib/types/user/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const userEndpoint = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
	withCredentials: true
})


const useSingleUserSearch = (username: string) => {
	
	async function fetchUser(username: string): Promise<User> {
		const res = userEndpoint.get(`/${username}`);
		return res.then((res) => {
			const parsedRes = userSchema.safeParse(res.data);
			if (!parsedRes.success) {
				throw parsedRes.error;
			}
			return parsedRes.data;
		})
	}

	const {
		data,
		isLoading,
		error,
		isError
	} = useQuery({
		queryFn: () => fetchUser(username),
		queryKey: [username]
	})

	return {
		data,
		isLoading,
		error,
		isError
	}
}

export default useSingleUserSearch;