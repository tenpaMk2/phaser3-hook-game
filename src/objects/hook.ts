// https://phaser.discourse.group/t/tracking-actions-for-multiple-game-objects/5223

import * as Phaser from "phaser";

export class Hook extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;
  isDead: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    targetX: number,
    targetY: number
  ) {
    super(
      scene,
      x,
      y,
      scene.scale.width / 100,
      scene.scale.width / 100,
      0xffffff
    );
    scene.add.existing(this);

    this.initPhysics();

    this.body.velocity.x = 300;
    this.body.velocity.setAngle(
      Phaser.Math.Angle.Between(x, y, targetX, targetY)
    );
  }

  private initPhysics() {
    this.scene.physics.world.enable(this);
    this.body.syncBounds = true;
    this.body.setAllowGravity(false);
  }

  public update(rootX: number, rootY: number) {
    if (
      this.scene.scale.width / 1 <
      Phaser.Math.Distance.Between(rootX, rootY, this.x, this.y)
    ) {
      this.die();
    }
  }

  public die() {
    this.destroy();
    this.isDead = true;
  }
}
