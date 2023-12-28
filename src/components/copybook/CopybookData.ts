
export interface CopybookData {
    format: string;
    description: string;
    styles: CopybookStylesData;
    pages: Array<CopybookPageData>;
}

export interface CopybookStylesData {
    [key: string]: any;
}

export interface CopybookPageData {
    title: string;
    lines: Array<string>;
    slashes: Array<string>;
    phrases: Array<CopybookPhraseData>;
}

export interface CopybookPhraseData {
    style: string;
    entries: Array<CopybookEntryData>;
}

export interface CopybookEntryData {
    style: string;
    content: string;
}