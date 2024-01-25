"use client";

import { SearchContext } from "@/contexts/SearchContext";
import { useState } from "react";

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);

	return (
		<SearchContext.Provider
			value={{
				open,
				setOpen,
				query,
				setQuery,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchContextProvider;
