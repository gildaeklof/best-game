import Phaser, { Game } from 'phaser';
import GameOver from './GameOver';
import GameWin from './GameWin';
import GameScene from './GameScene';

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
      debug: false,
    },
  },
  scene: [GameScene, GameOver, GameWin],
};

export default new Phaser.Game(config);
