import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/components/shared.module';
import { DashboardComponent } from './weather/pages/dashboard/dashboard.component';
import { ForecastDetailComponent } from './weather/pages/forecast-detail/forecast-detail.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        DashboardComponent,
        ForecastDetailComponent
    ],
    exports: [DashboardComponent, ForecastDetailComponent]
})
export class WeatherModule { }
