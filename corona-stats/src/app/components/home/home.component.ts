import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { CoronaStatsObject } from 'src/app/interfaces/CoronaStatsObject';

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

  ngOnInit() {
    this.getAllCoronaStats();
    this.getAllCoronaCountriesStats();

    const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
  }

  getAllCoronaStats() {
    this.getDataService.getData().subscribe((results) => {
      console.log(results);
      this.coronaStats = results;
    });
  }

  getAllCoronaCountriesStats() {
    this.getDataService.getCountryData().subscribe((results) => {
      console.log(results);
    });
  }
}
