import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { SharedService } from '../services/shared.service';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let sharedServiceSpy: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      providers: [{
        provide: SharedService,
        useValue: jasmine.createSpyObj('SharedService', [
          'fetchSpaceXData'
        ])
      }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    sharedServiceSpy = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare the launch year list on initialize', () => {
    expect(component.launchYearsList).toContain(2020);
  });

  it('should set selected filters', () => {
    component.filterMissions('launch_year', 2020);
    expect(component.selectedFilters.launch_year).toEqual(2020);
    expect(sharedServiceSpy.fetchSpaceXData).toHaveBeenCalledWith(component.selectedFilters);
  });
});
