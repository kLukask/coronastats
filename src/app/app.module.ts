import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './searchFilterPipe';
import { IndividualCountryDialogComponent } from './../app/components/home/individual-country-dialog/individual-country-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchFilterPipe,
    IndividualCountryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [IndividualCountryDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
