import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchQrCode = async () => {
	console.log("================ SENDING REQUEST");
	return await axiosClient.get<string>("/auth/2fa/qrcode").then(({ data }) => data);
};

const useQrCode = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		retry: false,
		queryKey: ["qrcode"],
		queryFn: fetchQrCode,
	});

	return { data, isLoading, isSuccess, isError, error };
};

export default useQrCode;
