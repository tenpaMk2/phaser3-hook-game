import * as Phaser from "phaser";

export class Platform extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;
  public isDead: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number) {
    const height = scene.scale.height / 40;
    super(scene, x, y, width, height, 0x88ffff);
    this.scene.add.existing(this);

    this.initPhysics();
  }

  private initPhysics() {
    this.scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }

  public update() {
    const camera = this.scene.cameras.main;
    if (camera.scrollY + camera.height < this.y) {
      this.die();
    }
  }

  public die() {
    this.destroy();
    this.isDead = true;
  }
}
