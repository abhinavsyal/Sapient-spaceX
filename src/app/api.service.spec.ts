import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should append URL With Filter values', () => {
    service.appendURLWithFilters({ launch_Year: 2020 });
    expect(service.dataURL).toEqual('https://api.spacexdata.com/v3/launches?limit=100&launch_Year=2020');
  });

  it('shouldfetch data from service', () => {
    const testData = [{ missions: '' }];
    service.fetchData({ launch_Year: 2020 }).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpMock.expectOne('https://api.spacexdata.com/v3/launches?limit=100&launch_Year=2020');
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });
});
