import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDropdownComponent } from './character-dropdown.component';

describe('CharacterDropdownComponent', () => {
  let component: CharacterDropdownComponent;
  let fixture: ComponentFixture<CharacterDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
