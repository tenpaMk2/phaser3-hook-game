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
    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      targetX,
      targetY
    );
    const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);

    this.body.velocity.setLength(distance);
    this.body.velocity.setAngle(angle);
  }
}
