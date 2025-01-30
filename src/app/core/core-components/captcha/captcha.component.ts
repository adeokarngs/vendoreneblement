import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  standalone: false,

  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css',
})
export class CaptchaComponent {
  num1: number = 0;
  num2: number = 0;
  userAnswer: number | null = null;
  @Output() captchaValidated = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  // Generate two random numbers for CAPTCHA
  generateCaptcha(): void {
    this.num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    this.num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    this.userAnswer = null;
  }

  // Validate the user answer
  validateCaptcha(): void {
    const correctAnswer = this.num1 + this.num2;
    const isValid = this.userAnswer === correctAnswer;

    // Emit the validation result
    this.captchaValidated.emit(isValid);

    // Optionally reset CAPTCHA after validation
    if (!isValid) {
      alert('Invalid CAPTCHA, please try again.');
      this.generateCaptcha();
    }
  }
}
