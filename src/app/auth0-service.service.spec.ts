import { TestBed } from '@angular/core/testing';

import { Auth0ServiceService } from './auth0-service.service';

describe('Auth0ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Auth0ServiceService = TestBed.get(Auth0ServiceService);
    expect(service).toBeTruthy();
  });
});
