import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetDataService } from 'src/app/services/get-data.service';
import { CoronaStatsObject } from 'src/app/interfaces/CoronaStatsObject';
import { CoronaCountriesStatsOjbect } from 'src/app/interfaces/CoronaCountriesStatsObject';

import { NovelCovid } from 'novelcovid';
import _ from 'lodash';
import { IndividualCountryDialogComponent } from './individual-country-dialog/individual-country-dialog.component';
import { Subject } from 'rxjs';

// Leaflet maps - Has to be declared as 'L'
declare let L;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coronaStats: CoronaStatsObject;
  // Add object interface later on
  coronaCountryStats: any;
  novelCovid = new NovelCovid();
  leafletMap: any;
  searchText: string;
  showStatsMobile: boolean;
  userActivity;
  userInactive: Subject<any> = new Subject();
  showOverlay: boolean;

  constructor(protected getDataService: GetDataService, protected dialog: MatDialog) {
    // Sets a 10 minute time out
    this.setTimeout();
    // Show overlay when user is inactive for 10 minutes
    this.userInactive.subscribe(() => {
      this.showOverlay = true;
    });

  }

  @HostListener('window:mousemove') refreshUserState() {
    // If user has interacted with the website then the timeout is restarted
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnInit() {
    // Initialise map
    this.leafletMap = L.map('map', {
      center: [13.7466, 100.5393],
      zoom: 2,
      zoomControl: false
    });

    // Set map bounds to make sure user can't navigate too far from the center
    // Todo - Uncomment this back, when bounds are working for mobile
    //this.leafletMap.setMaxBounds(this.leafletMap.getBounds());
    // Move zoom buttons to the bottom right corner
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.leafletMap);

    // Add tile layer to the map
    const esriLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16,
      minZoom: 3
    }).addTo(this.leafletMap);

    // Get total corona stats
    this.getAllCoronaStats();
    // Get stats from every country
    this.getAllCoronaCountriesStats();
  }

  // Get corona stats for total cases
  async getAllCoronaStats() {
    this.coronaStats = await this.novelCovid.all();
  }

  // Get corona stats for each individual country
  async getAllCoronaCountriesStats() {
    // Add object interface later on
      // Sort by total cases
      await this.novelCovid.countries(null, { sort: 'cases'}).then((result) => {
      this.coronaCountryStats = result;
      this.processPopups();
    });

  }

  // Add popus to the map
  processPopups() {
    // Loop through the array of every country
    for (const country of this.coronaCountryStats) {
      // Create a circle popup and place it on top of every country
      const mapCircle = L.circle([country.countryInfo.lat, country.countryInfo.long], {
        color: 'red',
        radius: country.cases
      }).addTo(this.leafletMap);

      // Add content to the popup
      const popup = L.popup()
      .setContent(`<div class="testingclass">
                   <img src=${country.countryInfo.flag} />
                   <p class="country-name">${country.country}</p>
                   <p>Cases: ${country.cases}</p>
                   <p>Recoveries: ${country.recovered}</p>
                   <p>Deaths: ${country.deaths}</p>
                   </div>`);

      // Bind popup to the circle
      mapCircle.bindPopup(popup);

      // Show popup content when user hovers the circle
      mapCircle.on('mouseover', function(e) {
        this.openPopup();
      });

      // Hide popup content when user moves mouse away
      mapCircle.on('mouseout', function(e) {
        this.closePopup();
      });

    }
  }


  openIndividualCountryDialog(stats) {
    const dialogRef = this.dialog.open(IndividualCountryDialogComponent, {
      height: '500px',
      width: '900px',
      data: {
        countryStats: stats
      }
    });
  }

  // Set a 10 minute timeout
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 10 * 60 * 1000);
  }

  // Refresh window
  refresh() {
    window.location.reload();
  }

}
