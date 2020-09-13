import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  missions = new Subject<Array<object>>();

  constructor(private apiService: ApiService) { }

  getMissions(): Observable<Array<object>> {
    return this.missions.asObservable();
  }

  updateMissions(missions: Array<object>): void {
    this.missions.next(missions);
  }

  fetchSpaceXData(selectedFilter?: any): void {
    this.apiService.fetchData(selectedFilter).subscribe((data: Array<object>) => {
      this.updateMissions(data);
    });
  }
}
