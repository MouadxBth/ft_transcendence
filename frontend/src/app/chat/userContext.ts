import { loggedUser } from "./userData";
import { createContext } from "react"
import { useState } from "react";

export type UserDataType = {
    name: string;
    conversations: {
        user: string;
        data: {
            content: string;
            senderId: number;
        }[];
    }[];
    channels: {
        user: string;
        data: {
            user: string;
            message: string;
        }[];
    }[];
}

type UserContextType = {
	userData: UserDataType,
	setUserData: (arg: UserDataType) => void
}

const user = {
	userData: loggedUser,
	setUserData: () => {}
}

export const userContext = createContext<UserContextType>(user);