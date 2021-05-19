import Phaser from 'phaser';

const GAMEWIN_SOUND = 'gamewinSound';

export default class GameWin extends Phaser.Scene {
  constructor() {
    super('gamewin');
    this.youWinLabel = undefined;
    this.playAgainLabel = undefined;
    this.style = { fontSize: '72px', fill: '#000' };
  }

  preload() {
    this.load.image('sky', '/sky-warm.png');
    this.load.audio(GAMEWIN_SOUND, ['/gamewin.mp3']);
  }

  create() {
    this.cameras.main.setZoom(1);
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);
    this.youWinLabel = new Phaser.GameObjects.Text(
      this,
      0,
      0,
      'YOU WIN!',
      this.style
    ).setScrollFactor(0);

    this.playAgainLabel = new Phaser.GameObjects.Text(
      this,
      0,
      0,
      'Click anywhere to try again',
      { fontSize: '20px', fill: '#000' }
    ).setScrollFactor(0);

    this.add.existing(this.playAgainLabel);

    this.add.existing(this.youWinLabel);

    this.sound.add(GAMEWIN_SOUND, { loop: false });
    this.sound.play(GAMEWIN_SOUND);
  }

  update(time, delta) {
    this.playAgainLabel.x = 235;
    this.playAgainLabel.y = 360;

    this.youWinLabel.x = 230;
    this.youWinLabel.y = 270;
    this.input.on('pointerdown', () => this.scene.start('gamescene'));
    return;
  }
}
