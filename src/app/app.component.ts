import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  subject = new Subject<Array<object>>();
  constructor(private sharedService: SharedService) {
  }
  ngOnInit(): void {
    this.sharedService.fetchSpaceXData();
  }


}
