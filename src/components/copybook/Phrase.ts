import { Style } from '@/components/copybook/Style'
import { Entry } from '@/components/copybook/Entry'

export class Phrase {
    style: Style;
    entries: Array<Entry>;

    constructor(style: Style, entries: Array<Entry>) {
        this.style = style
        this.entries = entries
    }
}