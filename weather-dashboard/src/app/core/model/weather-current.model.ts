export interface WeatherCurrentResponse {
    data: WeatherCurrentObservation[];
    count: number;
}

export interface WeatherCurrentObservation {
    city_name: string;
    state_code: string;
    country_code: string;
    timezone: string;

    temp: number;
    app_temp: number;
    rh: number;
    clouds: number;
    sunrise: string;
    sunset: string;

    weather: {
        icon: string;
        code: number;
        description: string;
    };

}
