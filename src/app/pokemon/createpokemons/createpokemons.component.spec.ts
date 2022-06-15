import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepokemonsComponent } from './createpokemons.component';

describe('CreatepokemonsComponent', () => {
  let component: CreatepokemonsComponent;
  let fixture: ComponentFixture<CreatepokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepokemonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
