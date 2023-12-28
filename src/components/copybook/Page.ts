import { Line } from '@/components/copybook/Line'
import type { Phrase } from '@/components/copybook/Phrase'

export class Page {
    title: string;
    lines: Array<Line>;
    slashes: Array<Line>;
    phrases: Array<Phrase>;

    constructor(title: string, lines: Array<Line>, slashes: Array<Line>, phrases: Array<Phrase>) {
        this.title = title
        this.lines = lines
        this.slashes = slashes
        this.phrases = phrases
    }
}