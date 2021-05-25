import Phaser from 'phaser';

const GAMEOVER_SOUND = 'gameoverSound';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameover');
    this.gameOverLabel = undefined;
    this.playAgainLabel = undefined;
    this.style = { fontSize: '72px', fill: '#ff0000' };
  }

  preload() {
    this.load.audio(GAMEOVER_SOUND, ['/gameover.mp3']);
  }

  create() {
    this.gameOverLabel = new Phaser.GameObjects.Text(
      this,
      0,
      0,
      'GAME OVER',
      this.style
    ).setScrollFactor(0);

    this.playAgainLabel = new Phaser.GameObjects.Text(
      this,
      0,
      0,
      'Click anywhere to try again',
      { fontSize: '20px', fill: '#fff' }
    ).setScrollFactor(0);

    this.add.existing(this.playAgainLabel);

    this.add.existing(this.gameOverLabel);

    this.sound.add(GAMEOVER_SOUND, { loop: false });
    this.sound.play(GAMEOVER_SOUND);
  }

  update(time, delta) {
    this.playAgainLabel.x = 250;
    this.playAgainLabel.y = 360;

    this.gameOverLabel.x = 215;
    this.gameOverLabel.y = 270;
    this.input.on('pointerdown', () => window.location.reload());
    return;
  }
}
