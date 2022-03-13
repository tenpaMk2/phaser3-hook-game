import * as Phaser from "phaser";
import { Ground } from "../objects/ground";
import { Hook } from "../objects/hook";
import { Platform } from "../objects/platform";
import { Player } from "../objects/player";
import { Score } from "../objects/score";

export class GameScene extends Phaser.Scene {
  public camera: Phaser.Cameras.Scene2D.Camera;
  public player: Player;
  public hook: Hook;
  public score: Score;
  public platforms: Platform[];

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("player", "assets/imgs/player.png");
  }

  create() {
    const unitLength = this.scale.width / 20;

    const ground = new Ground(this);
    this.platforms = [];
    this.platforms.push(
      new Platform(
        this,
        unitLength * 10,
        -unitLength * 10,
        Phaser.Math.RND.between(unitLength * 10, unitLength * 15)
      )
    );
    this.platforms.push(
      new Platform(
        this,
        unitLength * 5,
        -unitLength * 20,
        Phaser.Math.RND.between(unitLength * 10, unitLength * 15)
      )
    );
    this.platforms.push(
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
      if (!this.hook || this.hook.isDead) {
        this.hook = new Hook(
          this,
          this.player.x,
          this.player.y,
          pointer.worldX,
          pointer.worldY
        );

        this.platforms.forEach((platform) => {
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

    this.score = new Score(this);

    // Colliders
    this.physics.add.collider(this.player, ground);

    // Camera
    this.camera = this.cameras.main;
    this.camera.setBounds(
      0,
      -this.scale.height * 40,
      this.scale.width,
      this.scale.height * 40,
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

    this.player.update();
    this.score.update(-this.player.y);

    this.platforms.forEach((platform) => {
      platform.update();
    });
    this.platforms = this.platforms.filter((platform) => !platform.isDead);

    if (this.platforms.length <= 3) {
      this.platforms.push(
        new Platform(
          this,
          Phaser.Math.RND.between(0, this.scale.width),
          this.cameras.main.scrollY,
          Phaser.Math.RND.between(
            this.scale.width / 20,
            (this.scale.width * 10) / 20
          )
        )
      );
    }
  }
}
