import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController } from '@ionic/angular';
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
  currentTime: Date = new Date();

  constructor(
    private weatherService: WeatherService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getWeather();
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  async getWeather() {
    if (!this.cityName.trim()) {
      this.error = 'Please enter a city name';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Fetching weather data...',
      duration: 10000,
    });
    await loading.present();

    this.weatherService.getWeather(this.cityName).subscribe(
      (data) => {
        console.log('Received weather data:', data);
        this.weather = data;
        this.error = null;
        loading.dismiss();
      },
      (err) => {
        console.error('Error fetching weather data', err);
        this.error = err;
        loading.dismiss();
      }
    );
  }

  searchCity() {
    this.getWeather();
  }
}
