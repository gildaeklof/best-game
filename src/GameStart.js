import Phaser from 'phaser';

export default class GameStart extends Phaser.Scene {
  constructor() {
    super('gamestart');
    this.gameStartLabel = undefined;
    this.style = { fontSize: '52px', fill: '#000' };
  }

  create() {
    this.gameStartLabel = new Phaser.GameObjects.Text(
      this,
      0,
      0,
      'CLICK TO PLAY',
      this.style
    ).setScrollFactor(0);

    this.add.existing(this.gameStartLabel);
  }

  update(time, delta) {
    this.gameStartLabel.x = 400 - 130;
    this.gameStartLabel.y = 300;
    this.input.on('pointerdown', () => this.scene.start('gamescene'));
    return;
  }
}
