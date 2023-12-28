import type { Style } from '@/components/copybook/Style'

export class Line {
    style: Style

    constructor(style: Style) {
        this.style = style;
    }
}