import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { MissionsComponent } from './missions/missions.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    MissionsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    OverlayModule
  ],
  providers: [
    { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getSessionStorage(): any {
  return (typeof window !== 'undefined') ? window.sessionStorage : null;
}
