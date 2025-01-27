import { Component } from '@angular/core';

@Component({
  selector: 'app-transcribe-audio',
  standalone: false,

  templateUrl: './transcribe-audio.component.html',
  styleUrl: './transcribe-audio.component.css'
})
export class TranscribeAudioComponent {
  isRecording = false;

  constructor() { }

  start() {
    this.isRecording = true;
    this.startRecording();
  }

  stop() {
    this.isRecording = false;
    this.stopRecording();
  }

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];



  startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          this.uploadAudio(new Blob(this.audioChunks, { type: 'audio/webm' }));
          this.audioChunks = [];
        };
      })
      .catch((err) => console.error('Error accessing audio devices:', err));
  }

  stopRecording() {
    this.mediaRecorder?.stop();
  }

  private uploadAudio(audioBlob: Blob) {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    // Replace with your .NET API endpoint
    fetch('https://your-dotnet-api.com/api/transcribe', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log('Transcription response:', data))
      .catch((err) => console.error('Error uploading audio:', err));
  }
}
