import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscribeAudioComponent } from './transcribe-audio.component';

describe('TranscribeAudioComponent', () => {
  let component: TranscribeAudioComponent;
  let fixture: ComponentFixture<TranscribeAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranscribeAudioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranscribeAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
