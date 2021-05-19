import Phaser, { Game } from 'phaser';
import GameStart from './scenes/GameStart';
import GameOver from './scenes/GameOver';
import GameWin from './scenes/GameWin';
import GameScene from './scenes/GameScene';
import Enemy from './scenes/Enemy';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0x000,
  pixelArt: true,
  zoom: 1,
  fps: 60,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [Enemy, GameOver, GameWin],
};

export default new Phaser.Game(config);
