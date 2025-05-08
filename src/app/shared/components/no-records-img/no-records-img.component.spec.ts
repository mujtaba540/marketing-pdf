import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRecordsImgComponent } from './no-records-img.component';

describe('NoRecordsImgComponent', () => {
  let component: NoRecordsImgComponent;
  let fixture: ComponentFixture<NoRecordsImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoRecordsImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoRecordsImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
