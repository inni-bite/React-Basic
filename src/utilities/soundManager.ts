import { Howl } from 'howler';

interface SoundOptions {
  seek?: number;
}

class SoundManager {
  private sounds: Record<string, Howl> = {};
  private soundOptions: Record<string, SoundOptions> = {};
  
  // Initialize sounds
  constructor() {
    // These sound files are placeholders. You'll need to add actual audio files to the assets/sounds directory
    this.registerSound('grinding', '/grinding-coffee.mp3', { seek: 9 });
    this.registerSound('pour', '/src/assets/sounds/pour.mp3');
    // 블렌딩 관련 사운드 추가
    this.registerSound('blending', '/src/assets/sounds/blending.mp3');
    this.registerSound('complete', '/src/assets/sounds/complete.mp3');
    this.registerSound('gatcha', '/src/assets/sounds/gatcha.mp3');
  }
  
  // Register a new sound
  registerSound(id: string, src: string, options?: SoundOptions) {
    this.sounds[id] = new Howl({
      src: [src],
      preload: true,
      volume: 0.7
    });
    
    // Save options for later use
    if (options) {
      this.soundOptions[id] = options;
    }
  }
  
  // Play a sound
  playSound(id: string) {
    if (this.sounds[id]) {
      const sound = this.sounds[id];
      const options = this.soundOptions[id];
      
      // Start sound
      const soundId = sound.play();
      
      // Apply seek if needed
      if (options && options.seek !== undefined) {
        sound.seek(options.seek, soundId);
      }
      
      return true;
    }
    console.warn(`Sound with id '${id}' not found`);
    return false;
  }
  
  // Stop a sound
  stopSound(id: string) {
    if (this.sounds[id]) {
      this.sounds[id].stop();
      return true;
    }
    console.warn(`Sound with id '${id}' not found`);
    return false;
  }
  
  // Set volume for a specific sound
  setVolume(id: string, volume: number) {
    if (this.sounds[id]) {
      this.sounds[id].volume(Math.max(0, Math.min(1, volume)));
      return true;
    }
    console.warn(`Sound with id '${id}' not found`);
    return false;
  }
  
  // Set global volume for all sounds
  setGlobalVolume(volume: number) {
    const normalizedVolume = Math.max(0, Math.min(1, volume));
    
    Object.keys(this.sounds).forEach(id => {
      this.sounds[id].volume(normalizedVolume);
    });
  }
}

// Singleton instance
const soundManager = new SoundManager();
export default soundManager;