import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsComponent } from './missions.component';
import { SharedService } from '../services/shared.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Observable } from 'rxjs';
import { OverlayModule } from '@angular/cdk/overlay';

describe('MissionsComponent', () => {
  let component: MissionsComponent;
  let fixture: ComponentFixture<MissionsComponent>;
  let sharedServiceSpy: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, OverlayModule],
      declarations: [MissionsComponent],
      providers: [
        SharedService,
        MatSnackBar
      ]
    })
      .compileComponents();
  }));

  describe('Missions Data', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MissionsComponent);
      component = fixture.componentInstance;
      sharedServiceSpy = TestBed.inject(SharedService);

    });

    it('should get missions data on initialize', async(() => {
      spyOn(sharedServiceSpy, 'getMissions').and.returnValue(of([{ links: { mission_patch: 1 } }]));
      fixture.detectChanges();
      expect(component.missionData).toEqual([{ links: { mission_patch: 1 } }]);
    }));

  });
  describe('No Missions Data', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MissionsComponent);
      component = fixture.componentInstance;
      sharedServiceSpy = TestBed.inject(SharedService);

    });

    it('should test snackbar', async(() => {
      spyOn(sharedServiceSpy, 'getMissions').and.returnValue(of([]));
      spyOn(component, 'openSnackBar');
      fixture.detectChanges();
      expect(component.openSnackBar).toHaveBeenCalled();
    }));
  });
});
