import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebSett } from './add-web-sett';

describe('AddWebSett', () => {
  let component: AddWebSett;
  let fixture: ComponentFixture<AddWebSett>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWebSett]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWebSett);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
