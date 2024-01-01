import { LineStyle } from "@/components/copygraph/Copygraph";

export class Workbook {
    fractionHeight: number = 3;
    pageHeight: number = 0;
    pageWidth: number = 0;
    pagePadding: number = 0;
    pageOrientation: string = 'portrait';
    layers: Array<Layer> = [];
}

/**
 * Слой со строками. Содержит параметры линии, размер отступа и ритм отображения.
 */
export class Layer {
    offset: number = 0;
    rhythm: Array<number> = [];
    lineStyle: LineStyle = new LineStyle();
}
