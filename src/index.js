import Phaser, { Game } from 'phaser';
import GameStart from './scenes/GameStart';
import GameOver from './scenes/GameOver';
import GameScene from './scenes/GameScene';
import GameWin from './scenes/GameWin';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0xfffce4ec,
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
