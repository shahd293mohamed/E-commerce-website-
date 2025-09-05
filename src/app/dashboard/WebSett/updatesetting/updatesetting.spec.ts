import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatesetting } from './updatesetting';

describe('Updatesetting', () => {
  let component: Updatesetting;
  let fixture: ComponentFixture<Updatesetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updatesetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatesetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
