import Phaser from "phaser";

export default class gameOver extends Phaser.Scene
{
    homeButton : any;
    preload()
    {
        //load the button image (the button will take the player to their home profile)
        this.homeButton = this.add.text(400, 500, 'Exit', {});
        this.homeButton.setInteractive();

        this.homeButton.on('pointerdown', () => { 
        console.log('button clicked'); 
        //redirec to home page
    });
    }
    create()
    {
        this.add.text(400, 200, "GAME OVER", {
			fontFamily: "Arial",
			fontSize: 38
		})
		.setOrigin(0.5)
    }
}
