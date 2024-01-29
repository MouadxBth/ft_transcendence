"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function ReactQueryClientProvider({ children }: any) {
	return (
		<QueryClientProvider client={client}>
			{children}
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
}

export { ReactQueryClientProvider };
