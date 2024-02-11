import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const parseQrCode = (data: unknown) => {
	const result = z.string().safeParse(data);

	if (!result || !result.success) {
		throw new Error(`Unable to parse data into an Qr Code Result ${result.error.message}`);
	}

	return result.data;
};

const fetchData = async () => {
	return await axiosClient.get("/auth/2fa/qrcode").then(({ data }) => parseQrCode(data));
};

const useQrCode = (username: string) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["qrcode", username],
		queryFn: fetchData,
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useQrCode;
