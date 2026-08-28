import Phaser from 'phaser';

type Manifest = {
  character: { id: string; spritesheet: string; rotations: Record<string, string> };
  tileset: { id: string; download_png: string };
};

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 900 }, debug: false }
  },
  scene: class extends Phaser.Scene {
    async preload() {
      const res = await fetch('/src/assets/manifest.json');
      const manifest: Manifest = await res.json();
      
      // Load tileset
      this.load.image('tiles', manifest.tileset.download_png);
      // Load character sprite sheet
      this.load.atlas('player', manifest.character.spritesheet, null);
    }
    create() {
      this.add.text(400, 100, 'Cyberpunk Platformer AI', { fontSize: '32px' }).setOrigin(0.5);
      
      // Demo platform
      const tiles = this.add.tileSprite(480, 400, 960, 64, 'tiles');
      tiles.setTint(0x00ffff);

      // Player placeholder using loaded atlas first frame
      const player = this.add.rectangle(100, 300, 32, 48, 0x00ffff);
      this.physics.add.existing(player);
      
      // Camera follow
      this.cameras.main.startFollow(player as any);
    }
    update() {}
  }
};

new Phaser.Game(config);
