import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  launchYearsList: Array<number>;
  selectedFilters: Filters;
  constructor(private sharedService: SharedService) {
    this.selectedFilters = {
      launch_year: '',
      launch_success: '',
      land_success: ''
    };
  }

  ngOnInit(): void {
    const year = new Date().getFullYear();
    this.launchYearsList = Array.from({ length: 15 }, (x, index) => (year - 15 + index + 1));
  }

  filterMissions(filterType: string, filterValue: any): void {
    this.selectedFilters[filterType] = filterValue;
    this.sharedService.fetchSpaceXData(this.selectedFilters);
  }

}

export interface Filters {
  launch_year: string | number;
  launch_success: string | boolean;
  land_success: string | boolean;
}

