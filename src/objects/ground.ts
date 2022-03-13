import * as Phaser from "phaser";

export class Ground extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene) {
    const width = scene.scale.width;
    const height = scene.scale.height;
    super(scene, width / 2, 0, width, height / 20, 0xFF7700);
    this.scene.add.existing(this);

    this.initPhysics();
  }

  private initPhysics() {
    this.scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }
}
