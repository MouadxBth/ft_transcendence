import React, { ReactNode } from "react";

type TitleProps = {
	children?: ReactNode;
	className?: string;
};

const Title = ({ children, className }: TitleProps) => {
	return <h1 className={`text-white ${className}`}>{children}</h1>;
};

export default Title;
