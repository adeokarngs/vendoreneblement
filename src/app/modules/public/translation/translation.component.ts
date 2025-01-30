import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-translation',
  standalone: false,

  templateUrl: './translation.component.html',
  styleUrl: './translation.component.css',
})
export class TranslationComponent {
  tForm: FormGroup;
  file: any;
  translatedText = '';
  @ViewChild('Ifile') fileInput!: ElementRef<HTMLInputElement>;
  lstLanguages = [
    { LanguageName: 'Arabic', LanguageCulture: 'ar-EG' },
    { LanguageName: 'Arabic - Morocco', LanguageCulture: 'ar-MA' },
    { LanguageName: 'ArgentinaEnglish', LanguageCulture: 'en-AR' },
    { LanguageName: 'ArgentinaSpanish', LanguageCulture: 'es-AR' },
    { LanguageName: 'Bahrain-Arabic', LanguageCulture: 'ar-BH' },
    { LanguageName: 'BrazilEnglish', LanguageCulture: 'en-Br' },
    { LanguageName: 'Chilean English', LanguageCulture: 'en-CL' },
    { LanguageName: 'Chilean Spanish', LanguageCulture: 'es-CL' },
    { LanguageName: 'ChineseEnglish', LanguageCulture: 'en-US' },
    { LanguageName: 'Colombian English', LanguageCulture: 'en-CO' },
    { LanguageName: 'Colombian Spanish', LanguageCulture: 'es-CO' },
    { LanguageName: 'Czech', LanguageCulture: 'cs-cz' },
    { LanguageName: 'Danish', LanguageCulture: 'da-dk' },
    { LanguageName: 'Dutch', LanguageCulture: 'nl-be' },
    { LanguageName: 'Dutch NL', LanguageCulture: 'nl-NL' },
    { LanguageName: 'Ecuador-English', LanguageCulture: 'en-EC' },
    { LanguageName: 'Ecuador-Sapnish', LanguageCulture: 'es-EC' },
    { LanguageName: 'English', LanguageCulture: 'en-IN' },
    { LanguageName: 'English AU', LanguageCulture: 'en-AU' },
    { LanguageName: 'English EG', LanguageCulture: 'en-EG' },
    { LanguageName: 'English GH', LanguageCulture: 'en-GH' },
    { LanguageName: 'English KE', LanguageCulture: 'sw-KE' },
    { LanguageName: 'English NG', LanguageCulture: 'ig-NG' },
    { LanguageName: 'English NL', LanguageCulture: 'en-NL' },
    { LanguageName: 'English NZ', LanguageCulture: 'en-NZ' },
    { LanguageName: 'English PH', LanguageCulture: 'en-PH' },
    { LanguageName: 'English SA', LanguageCulture: 'en-ZA' },
    { LanguageName: 'English SG', LanguageCulture: 'en-SG' },
    { LanguageName: 'English SNE', LanguageCulture: 'en-US' },
    { LanguageName: 'English UK', LanguageCulture: 'en-GB' },
    { LanguageName: 'English US', LanguageCulture: 'en-US' },
    { LanguageName: 'English VN', LanguageCulture: 'en-VN' },
    { LanguageName: 'English-HK', LanguageCulture: 'en-HK' },
    { LanguageName: 'English-ID', LanguageCulture: 'en-ID' },
    { LanguageName: 'English-KSA', LanguageCulture: 'en-SA' },
    { LanguageName: 'English-Morocco', LanguageCulture: 'en-MA' },
    { LanguageName: 'English-MY', LanguageCulture: 'en-US' },
    { LanguageName: 'Filipano', LanguageCulture: 'fil-PH' },
    { LanguageName: 'Finnish', LanguageCulture: 'fi-fi' },
    { LanguageName: 'French', LanguageCulture: 'fr-FR' },
    { LanguageName: 'FrenchEnglish', LanguageCulture: 'en-FR' },
    { LanguageName: 'German DE', LanguageCulture: 'de-DE' },
    { LanguageName: 'GermanEnglish', LanguageCulture: 'en-DE' },
    { LanguageName: 'Hungarian', LanguageCulture: 'hu-hu' },
    { LanguageName: 'Hindi', LanguageCulture: 'hi' },
    { LanguageName: 'Indonesian', LanguageCulture: 'id-ID' },
    { LanguageName: 'Irish', LanguageCulture: 'ga-ie' },
    { LanguageName: 'Italian', LanguageCulture: 'it-IT' },
    { LanguageName: 'ItalianEnglish', LanguageCulture: 'en-IT' },
    { LanguageName: 'Japnese', LanguageCulture: 'ja-jp' },
    { LanguageName: 'Jordon-Arabic', LanguageCulture: 'ar-JO' },
    { LanguageName: 'Korean', LanguageCulture: 'ko-KR' },
    { LanguageName: 'KoreanEnglish', LanguageCulture: 'en-KR' },
    { LanguageName: 'KSA-Arabic', LanguageCulture: 'ar-SA' },
    { LanguageName: 'Kuwait-Arabic', LanguageCulture: 'ar-KW' },
    { LanguageName: 'Kuwait-English', LanguageCulture: 'en-KW' },
    { LanguageName: 'Luxembourgish', LanguageCulture: 'lb-lu' },
    { LanguageName: 'Melayu', LanguageCulture: 'ms-MY' },
    { LanguageName: 'MexicanEnglish', LanguageCulture: 'en-ES' },
    { LanguageName: 'Nigeria Hausa', LanguageCulture: 'nr-NG' },
    { LanguageName: 'Norwegian', LanguageCulture: 'nb-no' },
    { LanguageName: 'Oman-Arabic', LanguageCulture: 'ar-OM' },
    { LanguageName: 'P-Spanish', LanguageCulture: 'es-ES' },
    { LanguageName: 'Peru-English', LanguageCulture: 'en-PE' },
    { LanguageName: 'Peru-Sapnish', LanguageCulture: 'es-PE' },
    { LanguageName: 'Polish', LanguageCulture: 'pl-PL' },
    { LanguageName: 'Polish English', LanguageCulture: 'en-PL' },
    { LanguageName: 'Portugese', LanguageCulture: 'pt-BR' },
    { LanguageName: 'Qatar-Arabic', LanguageCulture: 'ar-QA' },
    { LanguageName: 'Qatar-English', LanguageCulture: 'en-QA' },
    { LanguageName: 'Romanian', LanguageCulture: 'ro-ro' },
    { LanguageName: 'Russian', LanguageCulture: 'ru-RU' },
    { LanguageName: 'Russian English', LanguageCulture: 'en-RU' },
    { LanguageName: 'Simplified Chinese', LanguageCulture: 'zh-CHS' },
    { LanguageName: 'Spain-English', LanguageCulture: 'en-ES' },
    { LanguageName: 'Spanish', LanguageCulture: 'es-ES' },
    { LanguageName: 'Swedish', LanguageCulture: 'sv-se' },
    { LanguageName: 'Taiwan-English', LanguageCulture: 'en-US' },
    { LanguageName: 'Thai', LanguageCulture: 'th-TH' },
    { LanguageName: 'Thai-English', LanguageCulture: 'en-TH' },
    { LanguageName: 'Traditional Chinese', LanguageCulture: 'zh-CHT' },
    { LanguageName: 'Traditional Chinese-HK', LanguageCulture: 'zh-HK' },
    { LanguageName: 'Turkish', LanguageCulture: 'tr-TR' },
    { LanguageName: 'Turkish-English', LanguageCulture: 'en-TR' },
    { LanguageName: 'UAE-Arabic', LanguageCulture: 'ar-AE' },
    { LanguageName: 'UAE-English', LanguageCulture: 'en-AE' },
    { LanguageName: 'Ukrainian', LanguageCulture: 'uk-ua' },
    { LanguageName: 'Vietnamase', LanguageCulture: 'vi-VN' },
  ];

  constructor(
    private _http: HttpClient,
    private _fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.tForm = this._fb.group({
      language: [null, Validators.required],
      text: [''],
    });
    this.onTextChanges();
  }
  submit() {
    if (this.tForm.valid) {
      if (this.file) {
        const form = new FormData();
        form.append('file', this.file);
        this._http
          .post(
            'http://localhost:5176/api/Video/UploadAndTranslate?targetLanguage=' +
              this.tForm.value?.language,
            form,
          )
          .subscribe((resp: any) => {
            this.translatedText = resp['translatedText'];
          });
      }
    }
  }

  removeFile() {
    this.file = null;
    this.fileInput.nativeElement.value = '';
  }
  onFileSelected(e: any) {
    this.file = e.currentTarget.files[0];
  }

  onTextChanges() {
    this.tForm.controls['text'].valueChanges
      .pipe(debounceTime(1000))
      .subscribe((resp) => {
        if (this.tForm.get('text').valid) {
          let payload = {
            text: this.tForm.get('text').value,
            language: 'hi',
          };
          this._http
            .post('http://localhost:5176/api/Video/translate', payload)
            .subscribe((resp: any) => {
              this.translatedText += '\n' + resp['translatedText'];
              this.tForm.get('text').reset();
            });
        }
      });
  }
}
