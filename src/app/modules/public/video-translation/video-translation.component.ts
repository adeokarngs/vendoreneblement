import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import videojs from 'video.js';

@Component({
  selector: 'app-video-translation',
  standalone: false,

  templateUrl: './video-translation.component.html',
  styleUrl: './video-translation.component.css'
})
export class VideoTranslationComponent {
  @ViewChild('myVideo') videoElement: any;
  videoSrc: string | null = null;
  subtitleSrc: string | null = null;
  language: FormControl = new FormControl("en")
  player: any;
  lstTrack: any = [
  ]
  loading: any = false
  lstLanguages = [
    { "LanguageName": "Arabic", "LanguageCulture": "ar-EG" },
    { "LanguageName": "Arabic - Morocco", "LanguageCulture": "ar-MA" },
    { "LanguageName": "ArgentinaEnglish", "LanguageCulture": "en-AR" },
    { "LanguageName": "ArgentinaSpanish", "LanguageCulture": "es-AR" },
    { "LanguageName": "Bahrain-Arabic", "LanguageCulture": "ar-BH" },
    { "LanguageName": "BrazilEnglish", "LanguageCulture": "en-Br" },
    { "LanguageName": "Chilean English", "LanguageCulture": "en-CL" },
    { "LanguageName": "Chilean Spanish", "LanguageCulture": "es-CL" },
    { "LanguageName": "ChineseEnglish", "LanguageCulture": "en-US" },
    { "LanguageName": "Colombian English", "LanguageCulture": "en-CO" },
    { "LanguageName": "Colombian Spanish", "LanguageCulture": "es-CO" },
    { "LanguageName": "Czech", "LanguageCulture": "cs-cz" },
    { "LanguageName": "Danish", "LanguageCulture": "da-dk" },
    { "LanguageName": "Dutch", "LanguageCulture": "nl-be" },
    { "LanguageName": "Dutch NL", "LanguageCulture": "nl-NL" },
    { "LanguageName": "Ecuador-English", "LanguageCulture": "en-EC" },
    { "LanguageName": "Ecuador-Sapnish", "LanguageCulture": "es-EC" },
    { "LanguageName": "English", "LanguageCulture": "en-IN" },
    { "LanguageName": "English AU", "LanguageCulture": "en-AU" },
    { "LanguageName": "English EG", "LanguageCulture": "en-EG" },
    { "LanguageName": "English GH", "LanguageCulture": "en-GH" },
    { "LanguageName": "English KE", "LanguageCulture": "sw-KE" },
    { "LanguageName": "English NG", "LanguageCulture": "ig-NG" },
    { "LanguageName": "English NL", "LanguageCulture": "en-NL" },
    { "LanguageName": "English NZ", "LanguageCulture": "en-NZ" },
    { "LanguageName": "English PH", "LanguageCulture": "en-PH" },
    { "LanguageName": "English SA", "LanguageCulture": "en-ZA" },
    { "LanguageName": "English SG", "LanguageCulture": "en-SG" },
    { "LanguageName": "English SNE", "LanguageCulture": "en-US" },
    { "LanguageName": "English UK", "LanguageCulture": "en-GB" },
    { "LanguageName": "English US", "LanguageCulture": "en-US" },
    { "LanguageName": "English VN", "LanguageCulture": "en-VN" },
    { "LanguageName": "English-HK", "LanguageCulture": "en-HK" },
    { "LanguageName": "English-ID", "LanguageCulture": "en-ID" },
    { "LanguageName": "English-KSA", "LanguageCulture": "en-SA" },
    { "LanguageName": "English-Morocco", "LanguageCulture": "en-MA" },
    { "LanguageName": "English-MY", "LanguageCulture": "en-US" },
    { "LanguageName": "Filipano", "LanguageCulture": "fil-PH" },
    { "LanguageName": "Finnish", "LanguageCulture": "fi-fi" },
    { "LanguageName": "French", "LanguageCulture": "fr-FR" },
    { "LanguageName": "FrenchEnglish", "LanguageCulture": "en-FR" },
    { "LanguageName": "German DE", "LanguageCulture": "de-DE" },
    { "LanguageName": "GermanEnglish", "LanguageCulture": "en-DE" },
    { "LanguageName": "Hungarian", "LanguageCulture": "hu-hu" },
    { "LanguageName": "Hindi", "LanguageCulture": "hi" },
    { "LanguageName": "Indonesian", "LanguageCulture": "id-ID" },
    { "LanguageName": "Irish", "LanguageCulture": "ga-ie" },
    { "LanguageName": "Italian", "LanguageCulture": "it-IT" },
    { "LanguageName": "ItalianEnglish", "LanguageCulture": "en-IT" },
    { "LanguageName": "Japnese", "LanguageCulture": "ja-jp" },
    { "LanguageName": "Jordon-Arabic", "LanguageCulture": "ar-JO" },
    { "LanguageName": "Korean", "LanguageCulture": "ko-KR" },
    { "LanguageName": "KoreanEnglish", "LanguageCulture": "en-KR" },
    { "LanguageName": "KSA-Arabic", "LanguageCulture": "ar-SA" },
    { "LanguageName": "Kuwait-Arabic", "LanguageCulture": "ar-KW" },
    { "LanguageName": "Kuwait-English", "LanguageCulture": "en-KW" },
    { "LanguageName": "Luxembourgish", "LanguageCulture": "lb-lu" },
    { "LanguageName": "Melayu", "LanguageCulture": "ms-MY" },
    { "LanguageName": "MexicanEnglish", "LanguageCulture": "en-ES" },
    { "LanguageName": "Nigeria Hausa", "LanguageCulture": "nr-NG" },
    { "LanguageName": "Norwegian", "LanguageCulture": "nb-no" },
    { "LanguageName": "Oman-Arabic", "LanguageCulture": "ar-OM" },
    { "LanguageName": "P-Spanish", "LanguageCulture": "es-ES" },
    { "LanguageName": "Peru-English", "LanguageCulture": "en-PE" },
    { "LanguageName": "Peru-Sapnish", "LanguageCulture": "es-PE" },
    { "LanguageName": "Polish", "LanguageCulture": "pl-PL" },
    { "LanguageName": "Polish English", "LanguageCulture": "en-PL" },
    { "LanguageName": "Portugese", "LanguageCulture": "pt-BR" },
    { "LanguageName": "Qatar-Arabic", "LanguageCulture": "ar-QA" },
    { "LanguageName": "Qatar-English", "LanguageCulture": "en-QA" },
    { "LanguageName": "Romanian", "LanguageCulture": "ro-ro" },
    { "LanguageName": "Russian", "LanguageCulture": "ru-RU" },
    { "LanguageName": "Russian English", "LanguageCulture": "en-RU" },
    { "LanguageName": "Simplified Chinese", "LanguageCulture": "zh-CHS" },
    { "LanguageName": "Spain-English", "LanguageCulture": "en-ES" },
    { "LanguageName": "Spanish", "LanguageCulture": "es-ES" },
    { "LanguageName": "Swedish", "LanguageCulture": "sv-se" },
    { "LanguageName": "Taiwan-English", "LanguageCulture": "en-US" },
    { "LanguageName": "Thai", "LanguageCulture": "th-TH" },
    { "LanguageName": "Thai-English", "LanguageCulture": "en-TH" },
    { "LanguageName": "Traditional Chinese", "LanguageCulture": "zh-CHT" },
    { "LanguageName": "Traditional Chinese-HK", "LanguageCulture": "zh-HK" },
    { "LanguageName": "Turkish", "LanguageCulture": "tr-TR" },
    { "LanguageName": "Turkish-English", "LanguageCulture": "en-TR" },
    { "LanguageName": "UAE-Arabic", "LanguageCulture": "ar-AE" },
    { "LanguageName": "UAE-English", "LanguageCulture": "en-AE" },
    { "LanguageName": "Ukrainian", "LanguageCulture": "uk-ua" },
    { "LanguageName": "Vietnamase", "LanguageCulture": "vi-VN" }
  ]
  file: string | Blob;
  subtitles: any = [
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
    "Test",
  ]
  metaSubtitle: { LanguageName: string; LanguageCulture: string; };
  vttData: any = []
  currentTimestamp: string;
  activeSubtitles: any[] = [];
  timestamps: string[] = Object.keys(this.vttData);
  constructor(private _http: HttpClient) {


  }
  ngAfterViewInit() {
    // Initialize the player only once
    // if (this.videoSrc) {
    //   this.player = videojs('my-video');
    // }
  }

  // Handle video file selection
  onVideoFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      this.videoSrc = videoUrl;

      // Reinitialize player with new video source
      // if (this.player) {
      //   this.player.src({ type: 'video/mp4', src: videoUrl });
      // } else {
      //   this.player = videojs('my-video'); // Initialize the player if not done
      // }
    }
  }

  // Handle subtitle file selection (supports .vtt, .srt formats)
  onSubtitleFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    this.file = file
    if (file) {
      const subtitleUrl = URL.createObjectURL(file);
      this.subtitleSrc = subtitleUrl;
    }
  }

  // Optional: Trigger when the metadata of the video is loaded
  onMetadataLoaded(): void {
    console.log('Video metadata loaded');
  }

  submit() {
    if (!this.file || !this.videoSrc) {
      alert('Please upload a file and select a video source.');
      return;
    }

    this.loading = true;

    const existingTrack = this.lstTrack.find((track: { srclang: string }) => track.srclang === this.language.value);

    if (!existingTrack) {
      const selectedLanguage = this.lstLanguages.find(lang => lang.LanguageCulture === this.language.value);

      if (!selectedLanguage) {
        this.loading = false;
        alert('Invalid language selection.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('languageCulture', selectedLanguage.LanguageCulture);
      formData.append('languageName', selectedLanguage.LanguageName);
      this.vttData ={}
      this._http.post('http://localhost:5176/api/Video/TranslateTranscription?targetLanguage=' + this.language.value, formData, { responseType: 'blob' })
        .subscribe({
          next: (response: Blob) => {
            this.subtitleSrc = URL.createObjectURL(response);
            this.metaSubtitle = selectedLanguage;

            // Parse the VTT content after loading
            this.parseVTT(response).then(parsedContent => {

              this.vttData = parsedContent
              this.timestamps = Object.keys(this.vttData);
              this.lstTrack.push({
                src: this.subtitleSrc,
                srclang: selectedLanguage.LanguageCulture,
                label: selectedLanguage.LanguageName,
                mode: 'show'
              });

              this.loading = false;
            }).catch(error => {
              console.error('Error parsing VTT:', error);
              this.loading = false;
            });
          },
          error: (error: any) => {
            console.error('Error during subtitle translation:', error);
            this.loading = false;
            alert('Failed to generate subtitles. Please try again.');
          }
        });
    } else {
      // Use existing track
      this.subtitleSrc = existingTrack.src;
      this.loading = false;
    }
  }

  parseVTT(blob: Blob): Promise<{ [timestamp: string]: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const parsedContent: { [timestamp: string]: string } = {};

        const lines = content.split('\n');
        let currentTimestamp = '';

        const timestampRegex = /^\d{2}:\d{2}:\d{2}(\.\d{3})?\s*-->\s*\d{2}:\d{2}:\d{2}(\.\d{3})?$/;

        lines.forEach((line) => {
          line = line.trim();  // Ensure we remove extra spaces
          if (timestampRegex.test(line)) {
            currentTimestamp = line.split(' --> ')[0]; // Extract start timestamp
          } else if (currentTimestamp && line.trim()) {
            parsedContent[currentTimestamp] = parsedContent[currentTimestamp]
              ? `${parsedContent[currentTimestamp]} ${line.trim()}`
              : line.trim();
          }
        });
        resolve(parsedContent);
      };

      reader.onerror = (error) => reject(error);

      reader.readAsText(blob);
    });
  }

  getCurrentTime() {
    if (this.videoElement && this.videoElement.nativeElement) {
      const currentTime = this.videoElement.nativeElement.currentTime;
      this.convertToTimestamp(currentTime);
    }
    return "null";
  }

  convertToTimestamp(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

    // Format the time as hh:mm:ss.sss
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}.${this.padZero(milliseconds, 3)}`;
  }

  // Method to pad numbers with leading zeros (e.g., 01, 02 for hours, minutes, seconds)
  padZero(num: number, length: number = 2): string {
    return num.toString().padStart(length, '0');
  }
  onTimeUpdate() {
    if (this.videoElement && this.videoElement.nativeElement) {
      const currentTime = this.videoElement.nativeElement.currentTime;

      this.currentTimestamp = this.convertToTimestamp(currentTime).split('.')[0];
      this.updateSubtitles(this.currentTimestamp)
    }
  }
  updateSubtitles(currentTimeStamp: any) {
    debugger
    if (this.vttData) {
   
      console.log(currentTimeStamp)
      
      const subtitle = this.vttData[`${currentTimeStamp}.000`]
      console.log(subtitle)
      if (subtitle && !this.activeSubtitles.find(x=>x == subtitle)) {

        this.activeSubtitles.push(subtitle);
        console.log(this.activeSubtitles)
      }
    }
  }
}
