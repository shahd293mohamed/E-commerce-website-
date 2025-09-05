import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getallproducts } from './getallproducts';

describe('Getallproducts', () => {
  let component: Getallproducts;
  let fixture: ComponentFixture<Getallproducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getallproducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getallproducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
