import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemoncreateComponent } from './pokemoncreate.component';

describe('PokemoncreateComponent', () => {
  let component: PokemoncreateComponent;
  let fixture: ComponentFixture<PokemoncreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemoncreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemoncreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
