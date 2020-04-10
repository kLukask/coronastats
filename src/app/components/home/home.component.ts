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
  getStats = new NovelCovid();
  leafletMap: any;

  ngOnInit() {

    this.leafletMap = L.map('map', {
      center: [13.7466, 100.5393],
      zoom: 4
    });

    const esriLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16,
      minZoom: 3
    }).addTo(this.leafletMap);

    this.getAllCoronaStats();
    this.getAllCoronaCountriesStats();
  }

  async getAllCoronaStats() {
    this.coronaStats = await this.getStats.all();
  }

  async getAllCoronaCountriesStats() {
    // Add object interface later on
      await this.getStats.countries().then((result) => {
      this.coronaCountryStats = result;
      this.processPopups();
    });
  }

  processPopups() {
    for (const country of this.coronaCountryStats) {
      const mapCircle = L.circle([country.countryInfo.lat, country.countryInfo.long], {
        color: 'red',
        radius: country.cases
      }).addTo(this.leafletMap);

      const popup = L.popup()
      .setContent(`<div class="testingclass">
                   <img src=${country.countryInfo.flag} />
                   <p class="country-name">${country.country}</p>
                   <p>Cases: ${country.cases}</p>
                   <p>Recoveries: ${country.recovered}</p>
                   <p>Deaths: ${country.deaths}</p>
                   </div>`);

      mapCircle.bindPopup(popup);

      mapCircle.on('mouseover', function(e) {
        this.openPopup();
      });

      mapCircle.on('mouseout', function(e) {
        this.closePopup();
      });

    }
  }

}
