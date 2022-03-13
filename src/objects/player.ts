import * as Phaser from "phaser";

export class Player extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");
    scene.add.existing(this);

    const length = scene.scale.width / 8;
    this.setDisplaySize(length, length);

    this.initPhysics();
  }

  private initPhysics() {
    this.scene.physics.world.enable(this);
  }

  public pull(targetX: number, targetY: number) {
    const distanceY = Phaser.Math.Difference(this.y, targetY);
    const initialVelY = -Math.sqrt(
      2 * distanceY * this.scene.physics.config.gravity.y
    );
    const bonus = 1.5;

    this.body.velocity.x = targetX - this.x;
    this.body.velocity.y = initialVelY * bonus;
  }
}
