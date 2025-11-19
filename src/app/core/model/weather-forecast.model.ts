export interface WeatherForecastWeather {
    description: string;
    icon: string;
}

export interface WeatherForecastDay {
    valid_date: string;

    max_temp: number;
    min_temp: number;
    temp: number;
    rh: number;

    pop: number;

    weather: WeatherForecastWeather;
}

export interface WeatherForecastResponse {
    city_name: string;
    state_code: string;
    country_code: string;
    data: WeatherForecastDay[];
}
