import * as Phaser from "phaser";
import { Ground } from "../objects/ground";
import { Hook } from "../objects/hook";
import { Platform } from "../objects/platform";
import { Player } from "../objects/player";

export class GameScene extends Phaser.Scene {
  public camera: Phaser.Cameras.Scene2D.Camera;
  public player: Player;
  public hook: Hook;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("background", "assets/imgs/background.jpg");
    this.load.image("player", "assets/imgs/player.png");
  }

  create() {
    const unitLength = this.scale.width / 20;

    this.camera = this.cameras.main;

    this.add.image(0, 0, "background").setOrigin(0);

    const ground = new Ground(this);
    const platforms: Platform[] = [];
    platforms.push(
      new Platform(
        this,
        unitLength * 10,
        -unitLength * 10,
        Phaser.Math.RND.between(unitLength * 10, unitLength * 15)
      )
    );
    platforms.push(
      new Platform(
        this,
        unitLength * 5,
        -unitLength * 20,
        Phaser.Math.RND.between(unitLength * 10, unitLength * 15)
      )
    );
    platforms.push(
      new Platform(
        this,
        unitLength * 15,
        -unitLength * 30,
        Phaser.Math.RND.between(unitLength * 10, unitLength * 15)
      )
    );

    this.player = new Player(
      this,
      this.scale.width / 2,
      -this.scale.height / 4
    );

    this.input.on("pointerdown", (pointer: any) => {
      // this.player.x = pointer.worldX;
      // this.player.y = pointer.worldY;

      // const angle = Phaser.Math.Angle.Between(
      //   this.player.x,
      //   this.player.y,
      //   pointer.worldX,
      //   pointer.worldY
      // );
      // this.player.body.velocity.x = 100 * Math.cos(angle);
      // this.player.body.velocity.y = 100 * Math.sin(angle);

      if (!this.hook || this.hook.isDead) {
        this.hook = new Hook(
          this,
          this.player.x,
          this.player.y,
          pointer.worldX,
          pointer.worldY
        );

        platforms.forEach((platform) => {
          this.physics.add.overlap(
            this.hook,
            platform,
            (hook: Hook, platform: Platform) => {
              this.player.pull(hook.x, hook.y);
              hook.die();
            }
          );
        });
      }
    });

    //Colliders
    this.physics.add.collider(this.player, ground);
    // this.physics.add.collider(this.player, platform);

    this.camera.setBounds(
      0,
      -this.scale.height * 2,
      this.scale.width,
      this.scale.height * 2,
      true
    );
    this.camera.startFollow(
      this.player,
      false,
      1,
      0.1,
      0,
      this.scale.height / 1000
    );
  }

  update(time: number, delta: number) {
    if (this.hook && !this.hook.isDead) {
      this.hook.update(this.player.x, this.player.y);
    }
  }
}
