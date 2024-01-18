import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NicknameFormType } from "@/lib/types/nickname-form";
import { getImageData } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";

export interface ImageFieldProps {
	control: Control<NicknameFormType, any>;
	setPreview: Dispatch<SetStateAction<string>>;
}

const ImageField = ({ control, setPreview }: ImageFieldProps) => {
	return (
		<FormField
			control={control}
			name="image"
			render={({ field: { onChange, value, ...rest } }) => (
				<>
					<FormItem>
						<FormLabel>
							Avatar <span className="text-xs">(Optional)</span>
						</FormLabel>
						<FormDescription className="text-xs">
							You can choose to upload a picture, or one will be given to you in case you don&apos;t
						</FormDescription>
						<FormControl>
							<Input
								className=" bg-secondary text-muted-foreground"
								type="file"
								{...rest}
								onChange={(event) => {
									const { files, displayUrl } = getImageData(event);
									setPreview(displayUrl);
									console.log(files);
									onChange(files);
								}}
							/>
						</FormControl>
						<FormMessage className="text-xs" />
					</FormItem>
				</>
			)}
		/>
	);
};

export default ImageField;
