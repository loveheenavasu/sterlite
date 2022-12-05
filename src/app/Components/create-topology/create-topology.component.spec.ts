import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopologyComponent } from './create-topology.component';

describe('CreateTopologyComponent', () => {
  let component: CreateTopologyComponent;
  let fixture: ComponentFixture<CreateTopologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTopologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
