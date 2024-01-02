import { LineStyle } from "@/components/copygraph/Copygraph";
import {th} from "vuetify/locale";

export class Workbook {
    fractionHeight: number = 3;
    pageHeight: number = 297;
    pageWidth: number = 210;
    pagePadding: number = 0;
    pageOrientation: string = 'portrait';
    layers: Array<Layer> = [];

    removeLayer(layer: Layer): void {
      const index: number = this.layers.indexOf(layer);
      if (index !== -1) {
        this.layers.splice(index, 1);
      }
    }

    showLayer(layer: Layer): void {
      const index: number = this.layers.indexOf(layer);
      if (index !== -1) {
        this.layers[index].visible = !this.layers[index].visible;
      }
    }

    newLayer(): Layer {
      const layer: Layer = new Layer();
      layer.offset = 6;
      layer.rhythm = [8,2,2,2,2];
      layer.lineStyle.width = 1;
      layer.lineStyle.style = 'dashed';
      layer.lineStyle.color = '#AAAAAA';
      return layer;
    }

    addNewLayer(): void {
      this.layers.push(this.newLayer());
    }

    addLayer(layer: Layer): void {
      this.layers.push(layer);
    }
}

/**
 * Слой со строками. Содержит параметры линии, размер отступа и ритм отображения.
 */
export class Layer {
    visible: boolean = true;
    offset: number = 0;
    rhythm: Array<number> = [];
    lineStyle: LineStyle = new LineStyle();
}
