import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-screen-reader',
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.css']
})
export class ScreenReaderComponent {
  private utterance: SpeechSynthesisUtterance;
  private isPaused: boolean;
  public isDarkMode: boolean;
  public fontStyles: string[] = ['Monospace', 'Fantasy','Times New Roman', "sans-serif"]; // Add your desired font styles here
  public currentFontStyle: string;
  
  
  constructor(private renderer: Renderer2) {
    this.utterance = new SpeechSynthesisUtterance();
    this.isPaused = false;
    this.isDarkMode = false;
    this.currentFontStyle = this.fontStyles[0];
    
  }

  

  play() {
    if (this.isPaused) {
      speechSynthesis.resume();
      this.isPaused = false;
    } else {
      const screenReaderContent = document.getElementById('screenReaderContent');
      if (screenReaderContent) {
        const text = screenReaderContent.innerText;
        this.utterance.text = text;
        speechSynthesis.speak(this.utterance);
      }
    }
  }

  pause() {
    if (!this.isPaused) {
      speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  cancel() {
    speechSynthesis.cancel();
    this.isPaused = false;
  }


  increaseFontSize() {
    const screenReaderContent = document.getElementById('screenReaderContent');
    if (screenReaderContent) {
      const currentFontSize = parseFloat(window.getComputedStyle(screenReaderContent).fontSize);
      screenReaderContent.style.fontSize = (currentFontSize + 1) + 'px';
    }
  }
  
  decreaseFontSize() {
    const screenReaderContent = document.getElementById('screenReaderContent');
    if (screenReaderContent) {
      const currentFontSize = parseFloat(window.getComputedStyle(screenReaderContent).fontSize);
      screenReaderContent.style.fontSize = (currentFontSize - 1) + 'px';
    }
  }
 /*  increaseFontSize() {
    const screenReaderContent = document.getElementById('screenReaderContent');
    if (screenReaderContent) {
      const currentFontSize = parseFloat(window.getComputedStyle(screenReaderContent).fontSize);
      const newFontSize = currentFontSize + 1;
      this.renderer.setStyle(screenReaderContent, 'fontSize', newFontSize + 'px');
    }
  }
  
  decreaseFontSize() {
    const screenReaderContent = document.getElementById('screenReaderContent');
    if (screenReaderContent) {
      const currentFontSize = parseFloat(window.getComputedStyle(screenReaderContent).fontSize);
      const newFontSize = currentFontSize - 1;
      this.renderer.setStyle(screenReaderContent, 'fontSize', newFontSize + 'px');
    }
  } */


  toggleBackgroundColor() {
    const screenReaderContent = document.getElementById('screenReaderContent');
    if (screenReaderContent) {
      if (this.isDarkMode) {
        this.renderer.setStyle(screenReaderContent, 'background-color', '');
        this.isDarkMode = false;
      } else {
        this.renderer.setStyle(screenReaderContent, 'background-color', 'darkgray');
        this.isDarkMode = true;
      }
    }
  }


  changeFontStyle() {
    const currentIndex = this.fontStyles.indexOf(this.currentFontStyle);
    const nextIndex = (currentIndex + 1) % this.fontStyles.length;
    this.currentFontStyle = this.fontStyles[nextIndex];

    const screenReaderContent = document.getElementById('screenReaderContent');
    if (screenReaderContent) {
      this.renderer.setStyle(screenReaderContent, 'font-family', this.currentFontStyle);
    }
  }
  
}