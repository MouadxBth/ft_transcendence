import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import React from "react";
import GameReceivedRequestsForm from "./GameReceivedRequestsForm";

export interface GameRequestsProps {
	className?: string;
}

const GameRequests = ({ className }: GameRequestsProps) => {
	return (
		<Card className={className}>
			<CardHeader className="py-3 px-6">
				<CardTitle>Requests</CardTitle>
				<CardDescription>Manage all of your Game requests!</CardDescription>
			</CardHeader>
			<CardContent>
				<GameReceivedRequestsForm />
			</CardContent>
		</Card>
	);
};

export default GameRequests;
