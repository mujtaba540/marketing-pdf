import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgThumbnailComponent } from './img-thumbnail.component';

describe('ImgThumbnailComponent', () => {
  let component: ImgThumbnailComponent;
  let fixture: ComponentFixture<ImgThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgThumbnailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
