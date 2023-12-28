import { Style } from '@/components/copybook/Style'

export class Entry {
    style: Style;
    content: string;

    constructor(style: Style, content: string) {
        this.style = style
        this.content = content
    }
}