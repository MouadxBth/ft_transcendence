import { Dispatch, SetStateAction, createContext } from "react";

interface SearchContextType {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType>({
	open: false,
	setOpen: () => {},
	query: "",
	setQuery: () => {},
});
