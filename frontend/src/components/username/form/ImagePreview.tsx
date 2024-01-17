import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface ImagePreviewProps {
	src: string;
}

const ImagePreview = ({ src }: ImagePreviewProps) => {
	console.log(src.length);
	return (
		<Avatar
			className={cn("w-32 h-32", {
				hidden: src.length === 0,
			})}
		>
			<AvatarImage
				className=" object-cover"
				src={src}
			/>
			<AvatarFallback>HI</AvatarFallback>
		</Avatar>
	);
};

export default ImagePreview;
