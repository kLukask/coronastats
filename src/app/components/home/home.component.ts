import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { CoronaStatsObject } from 'src/app/interfaces/CoronaStatsObject';
import { CoronaCountriesStatsOjbect } from 'src/app/interfaces/CoronaCountriesStatsObject';

import { NovelCovid } from 'novelcovid';

// Leaflet maps - Has to be declared as 'L'
declare let L;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(protected getDataService: GetDataService) { }

  coronaStats: CoronaStatsObject;
  // Add object interface later on
  coronaCountryStats: any;
  novelCovid = new NovelCovid();
  leafletMap: any;

  ngOnInit() {

    // Initialise map
    this.leafletMap = L.map('map', {
      center: [13.7466, 100.5393],
      zoom: 4
    });

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

  //
  async getAllCoronaStats() {
    this.coronaStats = await this.novelCovid.all();
    console.log(new Date(this.coronaStats.updated));
  }

  async getAllCoronaCountriesStats() {
    // Add object interface later on
      await this.novelCovid.countries(null, "cases").then((result) => {
      this.coronaCountryStats = result;
      console.log(this.coronaCountryStats);
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

}
