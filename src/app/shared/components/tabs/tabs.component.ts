import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef
} from '@angular/core';

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss'
})
export class TabsComponent<T extends { id: string }> {
    @Input() items: T[] = [];
    @Input() activeId: string | null = null;
    @Input() contentTemplate?: TemplateRef<any>;

    @Output() activeChange = new EventEmitter<string>();
    @Output() closed = new EventEmitter<string>();

    get activeItem(): T | null {
        return this.items.find(i => this.getId(i) === this.activeId) ?? null;
    }

    getId(item: T): string {
        return (item as any).id;
    }

    getLabel(item: any): string {
        const city = item.cityName ?? item.name ?? item.id;
        const zip = item.zipCode ?? item.id;
        return `${city} (${zip})`;
    }

    onSelect(item: T): void {
        const id = this.getId(item);
        this.activeChange.emit(id);
    }

    onClose(item: T, event: MouseEvent): void {
        event.stopPropagation();
        const id = this.getId(item);
        this.closed.emit(id);
    }
}
