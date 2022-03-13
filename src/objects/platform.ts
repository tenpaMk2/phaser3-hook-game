import * as Phaser from "phaser";

export class Platform extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene) {
    const width = Phaser.Math.RND.between(
      scene.scale.width / 2,
      scene.scale.width
    );
    const height = scene.scale.height / 40;
    super(scene, 120, -320, width, height, 0x88ffff);
    this.scene.add.existing(this);

    this.initPhysics();
  }

  private initPhysics() {
    this.scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }
}
