import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GellAllmessages } from './gell-allmessages';

describe('GellAllmessages', () => {
  let component: GellAllmessages;
  let fixture: ComponentFixture<GellAllmessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GellAllmessages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GellAllmessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
