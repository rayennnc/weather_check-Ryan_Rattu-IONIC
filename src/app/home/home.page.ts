import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  weather: any;
  error: string | null = null;
  cityName: string = 'Manado';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeather(this.cityName).subscribe(
      (data) => {
        this.weather = data;
        this.error = null;
      },
      (err) => {
        console.error('Error fetching weather data', err);
        this.error = 'Unable to fetch weather data. Please try again later.';
      }
    );
  }

  searchCity() {
    if (this.cityName.trim() !== '') {
      this.getWeather();
    }
  }
}
