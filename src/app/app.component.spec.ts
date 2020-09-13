import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedService } from './services/shared.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sharedServiceSpy: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: SharedService,
        useValue: jasmine.createSpyObj('SharedService', [
          'fetchSpaceXData'
        ])
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sharedServiceSpy = TestBed.inject(SharedService);

  });

  it('should call the fetch spaceX data ', () => {
    sharedServiceSpy = TestBed.inject(SharedService);
    fixture.detectChanges();
    expect(sharedServiceSpy.fetchSpaceXData).toHaveBeenCalled();
  });
});
