import { TestBed } from '@angular/core/testing';

import { ContactusServices } from './contactus-services';

describe('ContactusServices', () => {
  let service: ContactusServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactusServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
