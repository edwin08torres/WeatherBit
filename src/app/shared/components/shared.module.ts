import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../components/tabs/tabs.component';

@NgModule({
    imports: [CommonModule, TabsComponent],
    exports: [TabsComponent]
})
export class SharedModule { }
