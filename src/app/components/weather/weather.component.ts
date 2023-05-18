import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  selectedLocation!: string;
  weatherData: any;
  groupedWeatherData: any[] = [];
  locations: string[] = ['Birmingham', 'London', 'Cardiff'];

  constructor(private weatherService: WeatherService) {}

  getWeatherInfo() {
    this.weatherService.getWeather(this.selectedLocation).subscribe(
      (data: any) => {
        this.weatherData = data;
        this.groupWeatherData();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  selectLocation(location: string) {
    if (this.selectedLocation === location) {
      this.selectedLocation = '';
      this.groupedWeatherData = [];
    } else {
      this.selectedLocation = location;
      this.getWeatherInfo();
    }
  }
  groupWeatherData() {
    this.groupedWeatherData = [];
    const groupedData: { [key: string]: any[] } = {};

    for (const weatherItem of this.weatherData.list) {
      const date = weatherItem.dt_txt.substr(0, 10);
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(weatherItem);
    }

    this.groupedWeatherData = Object.entries(groupedData).map(
      ([date, weatherList]) => {
        return { date, weatherList };
      }
    );
  }
}
