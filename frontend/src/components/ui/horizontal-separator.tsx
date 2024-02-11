import React from "react";

const HorizontalSeparator = ({ text }: { text?: string }) => {
	return (
		<div className="flex items-center">
			<hr className="flex-grow border-t-2" />
			<span className="mx-4 text-accent">{text}</span>
			<hr className="flex-grow border-t-2 " />
		</div>
	);
};

export default HorizontalSeparator;
