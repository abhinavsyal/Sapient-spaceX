import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../api.service';

describe('SharedService', () => {
  let service: SharedService;
  let apiServiceSpy: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SharedService);
    apiServiceSpy = TestBed.inject(ApiService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get missions', () => {
    const missions = [{missionData: ''}];
    service.updateMissions(missions);
    service.getMissions().subscribe(data => {
      expect(data).toEqual(missions);
    });
  });

  it('should update missions', () => {
    const missions = [{missionData: ''}];
    spyOn(service.missions, 'next');
    service.updateMissions(missions);
    expect(service.missions.next).toHaveBeenCalledWith(missions);
  });
});
