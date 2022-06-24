/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Notfound404Component } from './notfound404.component';

describe('Notfound404Component', () => {
  let component: Notfound404Component;
  let fixture: ComponentFixture<Notfound404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Notfound404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Notfound404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
