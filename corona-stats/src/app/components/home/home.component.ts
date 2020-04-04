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

  ngOnInit() {
    this.getAllCoronaStats();
    this.getAllCoronaCountriesStats();

    const map = L.map('map', {
      center: [13.7466, 100.5393],
      zoom: 4
    });

    const esriLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16,
      minZoom: 2
    }).addTo(map);

    const mapCircle = L.circle([51.505, -0.09], {
      color: 'red',
      radius: 200
    }).addTo(map);

    mapCircle.bindPopup("This is a popup").openPopup();

  }

  async getAllCoronaStats() {
    this.coronaStats = await this.getStats.all();
  }

  async getAllCoronaCountriesStats() {
    // Add object interface later on
    this.coronaCountryStats = await this.getStats.countries();
  }

}