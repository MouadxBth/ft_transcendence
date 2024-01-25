import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn, getImageData } from "@/lib/utils";

interface GenericImageFieldProps<T extends FieldValues> {
	label: string;
	description?: string;
	control: Control<T>;
	setPreview?: Dispatch<SetStateAction<string>>; // Make setPreview optional
	name: Path<T>; // Corrected type for name
	type?: "file"; // Only allow file input types
	className?: string;
}

const GenericImageField = <T extends FieldValues>({
	label,
	description,
	control,
	name,
	type,
	setPreview,
	className,
}: GenericImageFieldProps<T>) => {
	// Enforce that the component is used only for file input types
	if (type !== "file") {
		throw new Error("GenericImageField can only be used with file input types.");
	}

	return (
		<FormField
			control={control}
			name={name}
			render={({ field: { onChange, value, ...rest } }) => (
				<>
					<FormItem className={cn("h-full border-l", className)}>
						<FormLabel>
							{label} <span className="text-xs">(Optional)</span>
						</FormLabel>
						{description && <FormDescription className="text-xs">{description}</FormDescription>}
						<FormControl>
							<Input
								className="bg-secondary text-muted-foreground"
								type={type}
								{...rest}
								onChange={(event) => {
									if (setPreview) {
										const { files, displayUrl } = getImageData(event);
										setPreview(displayUrl);
										onChange(files);
									} else {
										onChange(event.target.files);
									}
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

export default GenericImageField;
