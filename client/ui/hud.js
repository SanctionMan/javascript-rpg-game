import { TextBlock } from '@babylonjs/gui';

// Creates and manages the HUD overlay
export class HUD {
  constructor(guiTexture) {
    this.timeText = new TextBlock();
    this.timeText.text = '00:00';
    this.timeText.color = 'white';
    this.timeText.fontSize = 28;
    this.timeText.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_RIGHT;
    this.timeText.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_TOP;
    this.timeText.top = '10px';
    this.timeText.left = '-20px';
    guiTexture.addControl(this.timeText);
  }

  // Call this every time the time updates
  setTimeString(timeString) {
    this.timeText.text = timeString;
  }
}