import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'a1df7a803cdb12266215c6cfb7fdf943';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private iconUrl = 'https://openweathermap.org/img/wn/';
  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`)
      .pipe(
        map(data => this.addIconUrl(data))
      );
  }

  private addIconUrl(data: any): any {
    if (data && data.weather && data.weather[0] && data.weather[0].icon) {
      return {
        ...data,
        iconUrl: `${this.iconUrl}${data.weather[0].icon}@2x.png`
      };
    }
    return data;
  }
}
