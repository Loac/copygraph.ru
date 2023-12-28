import type {
    CopybookData,
    CopybookEntryData,
    CopybookPageData,
    CopybookPhraseData
} from '@/components/copybook/CopybookData'
import { Page } from '@/components/copybook/Page'
import { Line } from '@/components/copybook/Line'
import { Phrase } from '@/components/copybook/Phrase'
import { Entry } from '@/components/copybook/Entry'
import type { Style } from '@/components/copybook/Style'

export class Copybook {
    pages: Array<Page>;


    constructor(pages: Array<Page>) {
        this.pages = pages
    }
}

export class CopybookBuilder {
    /**
     * Цепочка методов, которые формируют объект Copybook, преобразовывая имена шаблонов в объекты
     * линий, строк и значений.
     */
    build(data: CopybookData): Copybook {
        return new Copybook(
            this.buildPages(data.pages, data.styles)
        );
    }

    buildPages(data: Array<CopybookPageData>, styles: Style): Array<Page> {
        const pages: Array<Page> = [];

        data.forEach((item: CopybookPageData): void => {
            pages.push(new Page(
                item.title,
                this.buildLines(item.lines, styles),
                this.buildLines(item.slashes, styles),
                this.buildPhrases(item.phrases, styles)
            ));
        });

        return pages;
    }

    buildLines(data: Array<string>, styles: Style): Array<Line> {
        const lines: Array<Line> = [];

        data.forEach((item: string): void => {
            lines.push(new Line(styles[item]));
        });

        return lines;
    }

    buildPhrases(data: Array<CopybookPhraseData>, styles: Style): Array<Phrase> {
        const phrases: Array<Phrase> = [];
        data.forEach((item: CopybookPhraseData): void => {
            phrases.push(new Phrase(
                styles[item.style],
                this.buildEntries(item.entries, styles)
            ));
        });

        return phrases;
    }

    buildEntries(data: Array<CopybookEntryData>, styles: Style): Array<Entry> {
        const entries: Array<Entry> = [];
        data.forEach((item: CopybookEntryData): void => {
             entries.push(new Entry(
                 styles[item.style],
                 item.content
             ));
        });

        return entries;
    }
}