import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  dataURL = 'https://api.spacexdata.com/v3/launches?limit=100';
  constructor(private httpClient: HttpClient) { }
  appendURLWithFilters(selectedFilters: any): void {
    let filteredURL = '';
    for (const [key, value] of Object.entries(selectedFilters)) {
      if ((Array.isArray(value) && value.length) || (!Array.isArray(value) && value !== '')) {
        filteredURL += '&' + key + '=' + value;
      }

    }
    this.dataURL = 'https://api.spacexdata.com/v3/launches?limit=100' + filteredURL;
  }
  fetchData(selectedFilters?: any): Observable<Array<object>> {
    if (selectedFilters) {
      this.appendURLWithFilters(selectedFilters);
    }
    return this.httpClient.get(this.dataURL) as Observable<Array<object>>;
  }
}
