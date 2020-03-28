import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { CoronaStatsObject } from 'src/app/interfaces/CoronaStatsObject';

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
