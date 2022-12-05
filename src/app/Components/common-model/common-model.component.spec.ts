import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModelComponent } from './common-model.component';

describe('CommonModelComponent', () => {
  let component: CommonModelComponent;
  let fixture: ComponentFixture<CommonModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonModelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommonModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
