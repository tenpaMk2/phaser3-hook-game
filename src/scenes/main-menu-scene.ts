import * as Phaser from "phaser";

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  init(): void {}

  preload(): void {}

  create(): void {
    const titleText = new Phaser.GameObjects.Text(
      this,
      this.scale.width / 2,
      this.scale.height / 2,
      ["Click", "to", "start"],
      { fontSize: "8em", align: "center" }
    );
    titleText.setOrigin(0.5);
    titleText.setInteractive();
    titleText.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      this.scene.start("GameScene");
    });
    this.add.existing(titleText);
  }

  update(): void {}
}
