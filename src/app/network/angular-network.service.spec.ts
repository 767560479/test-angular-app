import { TestBed } from '@angular/core/testing';

import { AngularNetworkService } from './angular-network.service';

describe('AngularNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularNetworkService = TestBed.get(AngularNetworkService);
    expect(service).toBeTruthy();
  });
});
