import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-location-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './location-search.component.html',
    styleUrl: './location-search.component.scss',
})
export class LocationSearchComponent {
    @Output() search = new EventEmitter<string>();
    @Input() loading = false;

    zip = '';

    toastVisible = false;
    toastMessage = '';

    onZipInput(): void {
        this.zip = this.zip.replace(/\D/g, '').slice(0, 5);

        if (this.toastVisible && this.zip.length > 0) {
            this.toastVisible = false;
        }
    }

    onSubmit(): void {
        const value = this.zip.trim();

        if (!value) {
            this.showToast('Debes ingresar un código postal antes de buscar.');
            return;
        }

        if (value.length < 5) {
            this.showToast('El código postal debe tener 5 dígitos.');
            return;
        }

        this.search.emit(value);

        this.zip = '';
    }

    private showToast(message: string): void {
        this.toastMessage = message;
        this.toastVisible = true;

        setTimeout(() => {
            this.toastVisible = false;
        }, 4000);
    }
}
