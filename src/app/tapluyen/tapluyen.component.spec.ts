import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapluyenComponent } from './tapluyen.component';

describe('TapluyenComponent', () => {
  let component: TapluyenComponent;
  let fixture: ComponentFixture<TapluyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapluyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapluyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
