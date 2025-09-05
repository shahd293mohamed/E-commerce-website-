import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllorders } from './get-allorders';

describe('GetAllorders', () => {
  let component: GetAllorders;
  let fixture: ComponentFixture<GetAllorders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllorders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllorders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
