import Phaser from 'phaser';

export default class GameWin extends Phaser.Scene {
  constructor() {
    super('gamewin');
    this.youWinLabel = undefined;
    this.playAgainLabel = undefined;
    this.style = { fontSize: '52px', fill: '#000' };
  }

  create() {
    this.youWinLabel = new Phaser.GameObjects.Text(
      this,
      0,
      0,
      'You Win!',
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

    this.add.existing(this.youWinLabel);
  }

  update(time, delta) {
    this.playAgainLabel.x = 400 - 130;
    this.playAgainLabel.y = 300 - 30;

    this.youWinLabel.x = 400 - 130;
    this.youWinLabel.y = 300;
    this.input.on('pointerdown', () => this.scene.start('gamescene'));
    return;
  }
}
