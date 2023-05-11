import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  city!: string;
  weatherData: any;
  groupedWeatherData: any[] = [];

  constructor(private weatherService: WeatherService) {}

  search() {
    this.weatherService.getWeather(this.city).subscribe(
      (data: any) => {
        this.weatherData = data;
        this.groupWeatherData();
      },
      (error: any) => {
        console.log(error);
      }
    );
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
