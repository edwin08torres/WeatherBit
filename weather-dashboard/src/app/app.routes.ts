import { Routes } from '@angular/router';
import { DashboardComponent } from './features/weather/pages/dashboard/dashboard.component';
import { ForecastDetailComponent } from './features/weather/pages/forecast-detail/forecast-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'forecast/:zip',
        component: ForecastDetailComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
