import { GameContextType } from "@/contexts/GameContext";
import { AuthenticatedUser } from "../user/authenticated-user";
import { GameMatchType } from "./game-match";

export interface GameData {
	context: GameContextType;
	authenticatedUser: AuthenticatedUser | null;
	match: GameMatchType;
}
