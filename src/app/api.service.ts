import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private dataURL: string = 'https://api.spacexdata.com/v3/launches?limit=100';
  constructor(private httpClient: HttpClient) { }
  appendURLWithFilters(selectedFilters) {
    console.log('selectedFilters', selectedFilters)
    let filteredURL = '';
   for(const[key, value] of Object.entries(selectedFilters)) { 
     console.log('value', value)
     if((Array.isArray(value) && value.length) || (!Array.isArray(value) && value !== '')) {
      filteredURL += '&' +  key + '=' + value;
     }
     
   }
   this.dataURL = 'https://api.spacexdata.com/v3/launches?limit=100' + filteredURL;
  }
  fetchData(selectedFilters): Observable<Array<Object>> {
    if (selectedFilters) {
      this.appendURLWithFilters(selectedFilters);
    }
    return <Observable<Array<Object>>>this.httpClient.get(this.dataURL);
  }
}
