import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'fe3695759da76e0c9dcaf566634a08ed';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(apiUrl);
  }
}
