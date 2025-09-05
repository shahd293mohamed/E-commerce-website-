import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getallcategories } from './getallcategories';

describe('Getallcategories', () => {
  let component: Getallcategories;
  let fixture: ComponentFixture<Getallcategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getallcategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getallcategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
