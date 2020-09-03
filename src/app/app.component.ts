import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ApiService } from './api.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SpaceX';
  missionData: Array<Object> = [];
  launchYearsList: Array<Object> = [];
  selectedFilters: Filters;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obsMissionData: Observable<any>;
  dataSource: MatTableDataSource<any>;
  constructor(private apiService: ApiService, private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar, @Inject('SESSIONSTORAGE') private sessionStorage: any,
    @Inject(PLATFORM_ID) private platformId: any) {
    this.selectedFilters = {
      launch_year: [],
      launch_success: '',
      land_success: ''
    }
  }
  ngOnInit() {

    this.launchYearsList = (() => {
      const year = new Date().getFullYear();
      return Array.from({ length: 15 }, (x, index) => { return { checkedStatus: false, year: year - 15 + index + 1 } })
    })();
    // if (isPlatformBrowser(this.platformId)) {
    //   console.log('this.sessionStorage', this.sessionStorage)
    //   if(this.sessionStorage.getItem('filters')) {
    //     this.selectedFilters =  JSON.parse(this.sessionStorage.getItem('filters'));
    //     // this.fetchSpaceXData();
    //   }
    // }
    // if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      // if (this.sessionStorage.getItem('filters')) {
      //   this.selectedFilters = JSON.parse(this.sessionStorage.getItem('filters'));
      //   this.fetchSpaceXData();
      // }
    // }
    // if (isPlatformServer(this.platformId)) {
      // Server only code.
      this.fetchSpaceXData();
    // }


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  fetchSpaceXData() {
    this.apiService.fetchData(this.selectedFilters).subscribe((data: Array<Object>) => {
      this.missionData = data;
      if (!this.missionData.length) {
        this.openSnackBar('No results found for this filter!', 'Close')
      }
      this.dataSource = new MatTableDataSource<any>(this.missionData);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obsMissionData = this.dataSource.connect();
    })
  }

  filterMissions(filterType: string, filterValue: any, event?) {
    if (typeof filterValue === 'boolean') {
      this.selectedFilters[filterType] = filterValue;
    } else {
      filterValue.checkedStatus = event.currentTarget.checked;
      if (filterValue.checkedStatus) {
        this.selectedFilters[filterType].push(filterValue.year);
      } else {
        const index = this.selectedFilters[filterType].indexOf(filterValue.year);
        this.selectedFilters[filterType].splice(index, 1)
      }
    }
    // this.sessionStorage.setItem('filters', JSON.stringify(this.selectedFilters));
    this.fetchSpaceXData();
  }
}

export interface Filters {
  launch_year: string | Array<Object>;
  launch_success: string | Boolean;
  land_success: string | Boolean;
}
