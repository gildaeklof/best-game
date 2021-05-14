import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameover');
    this.gameOverLabel = undefined;
    this.playAgainLabel = undefined;
    this.style = { fontSize: '52px', fill: '#000' };
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
      'Click to try again',
      { fontSize: '20px', fill: '#000' }
    ).setScrollFactor(0);

    this.add.existing(this.playAgainLabel);

    this.add.existing(this.gameOverLabel);
  }

  update(time, delta) {
    this.playAgainLabel.x = 400 - 130;
    this.playAgainLabel.y = 300 - 30;

    this.gameOverLabel.x = 400 - 130;
    this.gameOverLabel.y = 300;
    this.input.on('pointerdown', () => this.scene.start('gamescene'));
    return;
  }
}
