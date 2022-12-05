import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighboursModelComponent } from './neighbours-model.component';

describe('NeighboursModelComponent', () => {
  let component: NeighboursModelComponent;
  let fixture: ComponentFixture<NeighboursModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighboursModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighboursModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
