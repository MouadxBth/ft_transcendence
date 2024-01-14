import WebFontFile from "@/lib/game/WebFontFile";
import { TitleSceneKey } from "../consts/SceneKeys";

export class Preload extends Phaser.Scene {
	preload() {
		console.log("STARTED PRELOAD SCENE");

		const fonts = new WebFontFile(this.load, "Press Start 2P");
		this.load.addFile(fonts);
	}

	create() {
		this.scene.start(TitleSceneKey);
	}
}
