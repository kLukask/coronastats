export interface CoronaCountriesStatsOjbect {
  country: string
  countryInfo: {
    lat: number
    lng: number
    flag: string
  };
  cases: number
  todayCases: number
  deaths: number
  todayDeaths: number
  recovered: number
  active: number
  critical: number
}
