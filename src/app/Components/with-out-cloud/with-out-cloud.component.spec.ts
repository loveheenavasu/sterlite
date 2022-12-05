import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithOutCloudComponent } from './with-out-cloud.component';

describe('WithOutCloudComponent', () => {
  let component: WithOutCloudComponent;
  let fixture: ComponentFixture<WithOutCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithOutCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithOutCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
