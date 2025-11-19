import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
    providers: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule | null) {
        if (parent) {
            throw new Error(
                'CoreModule ya ha sido cargado. Solo debe importarse una vez.'
            );
        }
    }
}
