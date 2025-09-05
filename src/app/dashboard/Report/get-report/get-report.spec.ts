import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReport } from './get-report';

describe('GetReport', () => {
  let component: GetReport;
  let fixture: ComponentFixture<GetReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
