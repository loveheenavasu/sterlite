import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithCloudComponent } from './with-cloud.component';

describe('WithCloudComponent', () => {
  let component: WithCloudComponent;
  let fixture: ComponentFixture<WithCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
