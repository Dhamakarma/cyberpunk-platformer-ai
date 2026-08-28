import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  backgroundColor: '#0a0a12',
  scene: {
    preload() {
      this.load.image('iso_tile', 'https://backblaze.pixellab.ai/file/pixellab-tiles/4faf6f95-7952-4f5e-92f1-7ab1cb96c6b3/8237ba6c-38e5-4b18-9ffb-b2c7171f53cd/tile_0.png');
      this.load.image('player', 'https://backblaze.pixellab.ai/file/pixellab-characters/4faf6f95-7952-4f5e-92f1-7ab1cb96c6b3/e959905d-13d3-42cc-969e-74eddb798a50/rotations/south.png?t=1787911140');
    },
    create() {
      const mapW = 15, mapH = 10;
      const tileW = 64, tileH = 32;

      // Build isometric grid
      for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
          const screenX = (x - y) * tileW / 2 + 480;
          const screenY = (x + y) * tileH / 2;
          const t = this.add.image(screenX, screenY, 'iso_tile');
          t.setAlpha(0.9);
        }
      }

      // Player in isometric center
      const player = this.add.image(480, 200, 'player').setScale(1.2);
      this.add.text(480, 40, 'ISO 2.5D CYBERPUNK - WASD to move', { fontSize: '20px', color: '#00ffff' }).setOrigin(0.5);

      // Simple movement
      const keys = this.input.keyboard?.addKeys('WASD') as any;
      this.events.on('update', () => {
        if (keys.W.isDown) player.y -= 2;
        if (keys.S.isDown) player.y += 2;
        if (keys.A.isDown) player.x -= 2;
        if (keys.D.isDown) player.x += 2;
      });
    }
  }
};

new Phaser.Game(config);
