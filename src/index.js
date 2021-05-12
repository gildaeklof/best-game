import Phaser from 'phaser';
import Doom from './scenes/Doom';
import GameScene from './scenes/GameScene';

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
      debug: true,
    },
  },
  scene: [GameScene],
};

export default new Phaser.Game(config);
