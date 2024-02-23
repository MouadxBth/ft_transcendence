import WebFontFile from "@/lib/game/WebFontFile";
import { TitleSceneKey } from "../consts/SceneKeys";
import { GameContextType } from "@/contexts/GameContext";

export class Preload extends Phaser.Scene {
	preload() {
		const fonts = new WebFontFile(this.load, "Press Start 2P");
		this.load.addFile(fonts);
	}

	create(context: GameContextType) {
		this.scene.start(TitleSceneKey, context);
	}
}
