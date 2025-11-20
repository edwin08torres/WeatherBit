import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Location } from '../model/location.model';

export interface LocationsViewModel {
    locations: Location[];
    activeLocationId: string | null;
}

@Injectable({ providedIn: 'root' })
export class LocationsStoreService {
    private readonly locationsSubject = new BehaviorSubject<Location[]>([]);
    private readonly activeLocationIdSubject = new BehaviorSubject<string | null>(null);

    readonly locations$ = this.locationsSubject.asObservable();
    readonly activeLocationId$ = this.activeLocationIdSubject.asObservable();

    readonly vm$: Observable<LocationsViewModel> = combineLatest([
        this.locations$,
        this.activeLocationId$
    ]).pipe(
        map(([locations, activeLocationId]) => ({ locations, activeLocationId }))
    );

    addLocation(location: Location): void {
        const current = this.locationsSubject.value;
        const exists = current.some(l => l.id === location.id);

        const next = exists ? current : [...current, location];
        this.locationsSubject.next(next);

        this.activeLocationIdSubject.next(location.id);
    }

    setActive(id: string): void {
        if (this.locationsSubject.value.some(l => l.id === id)) {
            this.activeLocationIdSubject.next(id);
        }
    }

    remove(id: string): void {
        const remaining = this.locationsSubject.value.filter(l => l.id !== id);
        this.locationsSubject.next(remaining);

        // si borramos la activa, activamos la primera disponible
        if (this.activeLocationIdSubject.value === id) {
            this.activeLocationIdSubject.next(remaining[0]?.id ?? null);
        }
    }
}
