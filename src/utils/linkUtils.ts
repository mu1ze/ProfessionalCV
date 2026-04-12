import type { LinkValue } from '../data/projects';
import { placeholderMap } from '../data/projects';

export function resolveLinkValue(value: LinkValue): { href: string; label: string; tooltip: string; isPlaceholder: boolean } {
    if (value in placeholderMap) {
        const placeholder = placeholderMap[value as keyof typeof placeholderMap];
        return {
            href: '#',
            label: placeholder.label,
            tooltip: placeholder.tooltip,
            isPlaceholder: true,
        };
    }
    return {
        href: value,
        label: '',
        tooltip: '',
        isPlaceholder: false,
    };
}