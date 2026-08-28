import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  backgroundColor: '#0a0a12',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 1000 }, debug: false }
  },
  scene: {
    preload() {
      // PixelLab assets
      this.load.image('tiles', 'https://api.pixellab.ai/mcp/sidescroller-tilesets/5bbc99d4-c20e-4030-82f9-6bc9fe634c2d/image');
      this.load.image('player', 'https://backblaze.pixellab.ai/file/pixellab-characters/4faf6f95-7952-4f5e-92f1-7ab1cb96c6b3/e959905d-13d3-42cc-969e-74eddb798a50/rotations/south.png?t=1787911140');
    },
    create() {
      const { width, height } = this.scale;

      // Background neon grid
      this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
      this.add.text(width/2, 40, 'CYBERPUNK PLATFORMER ALPHA', { fontSize: '28px', color: '#00ffff' }).setOrigin(0.5);

      // Platforms from tileset
      const platforms = this.physics.add.staticGroup();
      const platformData = [
        [0, 400, 12],
        [300, 320, 8],
        [600, 240, 8],
        [900, 160, 6],
        [1200, 320, 8],
        [1600, 200, 10]
      ];
      platformData.forEach(([x, y, w]) => {
        const rect = this.add.rectangle(x, y, w*32, 32, 0x00ffff);
        (rect as any).body = { type: 'static' };
        platforms.add(rect);
      });

      // Player
      const player = this.physics.add.sprite(100, 300, 'player');
      player.setScale(1.5);
      player.body.setCollideWorldBounds(true);

      // Colliders
      this.physics.add.collider(player, platforms, () => {});

      // Controls
      const keys = this.input.keyboard?.addKeyObject(Phaser.Input.Keyboard.KeyCodes.LEFT) as any;
      const right = this.input.keyboard?.addKeyObject(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      const up = this.input.keyboard?.addKeyObject(Phaser.Input.Keyboard.KeyCodes.UP);

      // Camera
      this.cameras.main.startFollow(player);
      this.cameras.main.setBounds(0, 0, 2000, height);

      // Update loop
      this.events.on('update', () => {
        const speed = 300;
        if (this.input.keyboard?.isDown('LEFT')) player.setVelocityX(-speed);
        else if (this.input.keyboard?.isDown('RIGHT')) player.setVelocityX(speed);
        else player.setVelocityX(0);

        if (Phaser.Input.Keyboard.JustDown(up)) player.setVelocityY(-500);
      });

      // Win condition
      const winZone = this.add.zone(1800, 150, 100, 100).setOrigin(0.5);
      this.physics.add.overlap(player, winZone as any, () => {
        this.add.text(width/2, height/2, 'LEVEL COMPLETE', { fontSize: '64px', color: '#ff00ff' }).setOrigin(0.5);
      });
    }
  }
};

new Phaser.Game(config);
