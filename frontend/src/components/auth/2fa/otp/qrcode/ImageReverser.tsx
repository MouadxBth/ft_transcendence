import Image from "next/image";

interface ImageReverserProps {
	imageUrl: string;
}

const ImageReverser = ({ imageUrl }: ImageReverserProps) => {
	const filterStyle = {
		filter: "invert(100%)",
	};

	return (
		<Image
			width={250}
			height={250}
			src={imageUrl}
			alt="Reversed Colors"
			style={filterStyle}
		/>
	);
};

export default ImageReverser;
