import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Twenty48Component } from './twenty48.component';

describe('TwentyFourtyEightComponent', () => {
  let component: Twenty48Component;
  let fixture: ComponentFixture<Twenty48Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Twenty48Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Twenty48Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
