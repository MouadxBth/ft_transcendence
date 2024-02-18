import { SearchContext } from "@/contexts/SearchContext";
import { useContext } from "react";

export const useSearch = () => {
	
	const context = useContext(SearchContext);

	if (!context) throw new Error(`useSearch hook must be used inside a SearchContextProvider`);

	return context;
};
