import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 900 }, debug: false }
  },
  scene: {
    preload() {},
    create() {
      this.add.text(400, 200, 'Cyberpunk Platformer AI', { fontSize: '32px' }).setOrigin(0.5);
      // Player placeholder
      const player = this.add.rectangle(100, 300, 32, 48, 0x00ffff);
      this.physics.add.existing(player);
    },
    update() {}
  }
};

new Phaser.Game(config);
