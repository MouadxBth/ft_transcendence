import Phaser from "phaser";

import WebFont, { Config } from "webfontloader";

export default class WebFontFile extends Phaser.Loader.File {
	fontNames: string[];
	service: string;

	constructor(
		loader: Phaser.Loader.LoaderPlugin,
		fontNames: string | string[],
		service: string = "google"
	) {
		super(loader, {
			type: "webfont",
			key: fontNames.toString(),
		});

		this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
		this.service = service;
	}

	override load() {
		const config = {
			active: () => {
				this.loader.nextFile(this, true);
			},
		} as Config;

		switch (this.service) {
			case "google":
				config["google"] = {
					families: this.fontNames,
				};
				break;

			default:
				throw new Error("Unsupported font service");
		}

		WebFont.load(config);
	}
}
