import Phaser from "phaser";

import { TitleScreenSceneKey } from "../consts/SceneKeys";
import WebFontFile from "@/utils/WebFontFile";

export class Preload extends Phaser.Scene {
	preload() {
		const fonts = new WebFontFile(this.load, "Press Start 2P");
		this.load.addFile(fonts);
	}

	create() {
		this.scene.start(TitleScreenSceneKey);
	}
}
