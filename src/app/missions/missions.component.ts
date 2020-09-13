import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  missionData: Array<object> = [];
  obsMissionData: Observable<any>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private sharedService: SharedService, private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.sharedService.getMissions().subscribe((data) => {
      this.missionData = data;
      if (!this.missionData.length) {
        this.openSnackBar('No results found for this filter!', 'Close');
      }
      this.dataSource = new MatTableDataSource<any>(this.missionData);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obsMissionData = this.dataSource.connect();
    });

  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
