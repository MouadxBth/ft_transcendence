import LoginCard from "@/components/auth/login/LoginCard";
import Register from "../../auth/register/RegisterCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const TabsSection = () => {
	return (
		<Tabs
			defaultValue="login"
			className=" w-11/12"
		>
			<TabsList className="grid w-full grid-cols-2 rounded-lg shadow-md shadow-blue-500/50">
				<TabsTrigger value="login">Login</TabsTrigger>
				<TabsTrigger value="register">Register</TabsTrigger>
			</TabsList>

			<TabsContent
				value="login"
				className="rounded-lg shadow-lg shadow-blue-500/50"
			>
				<LoginCard />
			</TabsContent>

			<TabsContent
				value="register"
				className="rounded-lg shadow-lg shadow-blue-500/50"
			>
				<Register />
			</TabsContent>
		</Tabs>
	);
};

export default TabsSection;
