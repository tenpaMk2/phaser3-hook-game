import * as Phaser from "phaser";

export class Score extends Phaser.GameObjects.Text {
  public score: number = 0;

  constructor(scene: Phaser.Scene) {
    super(scene, scene.scale.width / 2, scene.scale.height / 20, "hoge", {
      fontSize: "5em",
    });
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.setScrollFactor(0);
  }

  public update(playerHeight: number) {
    this.score = this.score < playerHeight ? playerHeight : this.score;
    this.score = Math.floor(this.score);

    this.text = `score: ${this.score}`;
  }
}
