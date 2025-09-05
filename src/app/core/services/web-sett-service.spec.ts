import { TestBed } from '@angular/core/testing';

import { WebSettService } from './web-sett-service';

describe('WebSettService', () => {
  let service: WebSettService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSettService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
