import { StyleValue } from "vue";
import {teal} from "vuetify/util/colors";
import {th} from "vuetify/locale";

export class Copygraph {
    presets: Map<string, Preset> = new Map();
    activePresetName: string = '';
    workbook: Workbook = new Workbook();

    /**
     * Загрузить пресеты из JSON-файлов. Метод вернет Promise,
     * с загруженными данными.
     */
    importPresets = async (): Promise<unknown> => {
        const presets = import.meta.glob('@/assets/presets/*.json');
        const promises: any[] = [];
        for (const path in presets) {
            promises.push(presets[path]());
        }
        return Promise.all(promises);
    }

    /**
     * Обработать импорт пресетов и сформировать массив объектов Preset.
     */
    buildPresets = (): Promise<unknown> => {
        const presetData: Promise<unknown> = this.importPresets();
        return presetData.then((data): void => {
            if (data instanceof Array) {
                data.forEach((item: Preset) => this.presets.set(item.name, Preset.fromData(item)));
            }

            if (this.presets.length > 0) {
                this.activePresetName = 'A4 6x6';
                this.acceptPreset(this.activePresetName);
            }
        });
    }

    /**
     * Найти и применить пресет к Workbook.
     */
    acceptPreset = (presetName: string): void => {
        const preset: Preset | undefined = this.presets.get(presetName);
        if (preset != undefined) {
            this.activePresetName = presetName;
            this.workbook.acceptPreset(preset);
        }
    }

    addPreset(data: Preset): void {
        this.presets.set(data.name, Preset.fromData(data));
    }

    /**
     * Удалить пресет, если он существует и не является статическим.
     */
    removePreset(presetName: string): void {
        const preset: Preset = this.presets.get(presetName);

        if (null == preset)
            return;
        if (preset.isStatic())
            throw new Error('You can\'t remove static preset');

        this.presets.delete(presetName);
    }

    /**
     * Добавить или перезаписать пользовательский пресет.
     */
    savePreset(presetName: string): Preset {
        const preset: Preset = this.presets.get(presetName);
        this.activePresetName = presetName;

        if (null != preset && preset.isStatic())
            throw new Error('You can\'t rewrite static preset');

        const extract: Preset = this.workbook.extractPreset();
        extract.type = 'user';
        extract.name = presetName;
        this.presets.set(presetName, extract);
        return extract;
    }
}

/**
 * Параметры стиля для линии разметки.
 */
export class LineStyle {
    width: number = 1;
    style: string = 'solid';
    color: string = '#000000';

    static fromData(data: LineStyle):LineStyle {
        const lineStyle: LineStyle = new LineStyle();
        lineStyle.width = data.width;
        lineStyle.style = data.style;
        lineStyle.color = data.color;
        return lineStyle;
    }
}

export class Workbook {
    fractionHeight: number = 3;
    pageHeight: number = 297;
    pageWidth: number = 210;
    pagePadding: number = 10;
    pageOrientation: string = 'portrait';
    layers: Array<Layer> = [];

    removeLayer(layer: Layer): void {
        const index: number = this.layers.indexOf(layer);
        if (index !== -1) {
            this.layers.splice(index, 1);
        }
    }

    removeLayerAll(): void {
        this.layers = [];
    }

    showLayer(layer: Layer): void {
        const index: number = this.layers.indexOf(layer);
        if (index !== -1) {
            this.layers[index].visible = !this.layers[index].visible;
        }
    }

    /**
     * Создать новый слой с базовыми значениями.
     */
    newLayer(): Layer {
        const layer: Layer = new Layer();
        layer.offset = 6;
        layer.rhythm = [8,2,2,2,2];
        layer.lineStyle.width = 1;
        layer.lineStyle.style = 'dashed';
        layer.lineStyle.color = '#AAAAAA';
        return layer;
    }

    /**
     * Создать новый слой и добавить его в Workbook.
     */
    addNewLayer(): void {
        this.addLayer(this.newLayer());
    }

    /**
     * Добавить слой в Workbook.
     */
    addLayer(layer: Layer): void {
        this.layers.push(layer);
    }

    /**
     * Применить пресет к Workbook.
     */
    acceptPreset(preset: Preset): void {
        this.fractionHeight = preset.fractionHeight;
        this.pageHeight = preset.pageHeight;
        this.pageWidth = preset.pageWidth;
        this.pagePadding = preset.pagePadding;
        this.pageOrientation = preset.pageOrientation;

        this.removeLayerAll();
        preset.layers.forEach((layer: Layer): void => {
            this.addLayer(Layer.fromData(layer));
        });
    }

    extractPreset(): Preset {
        const preset: Preset = Preset.fromData(this);
        preset.format = '0.2';
        preset.type = 'user';
        return preset;
    }

    pageStyle(): StyleValue {
        return {
            width: this.pageWidth + 'mm',
            height: this.pageHeight + 'mm',
            padding: this.pagePadding + 'mm'
        }
    }

    /**
     * Сформировать стиль отображения слоя.
     */
    layerStyle(offset: number): StyleValue {
        return {
            marginTop: (this.fractionHeight * offset - this.fractionHeight) * -1 + 'mm'
        }
    }

    /**
     * Сформировать столь отображения линии.
     */
    lineStyle(offset: number, lineStyle: LineStyle): StyleValue {
        return {
            height: this.fractionHeight + 'mm',
            marginTop: (this.fractionHeight * offset - this.fractionHeight) + 'mm',
            borderTop: lineStyle.width + 'px ' + lineStyle.style + ' ' + lineStyle.color
        }
    }

    /**
     * Сформировать список объектов страницы для вывода.
     * Необходимо сгенерировать столько линий, чтобы они
     * заполнили весь лист. Для этого, необходимо подсчитывать
     * примерную высоту каждой линии.
     */
    render(): RPage {
        const rPage: RPage = new RPage();
        rPage.style = this.pageStyle();
        const lineHeight: number = this.fractionHeight;
        if (lineHeight < 1) {
            return rPage;
        }

        this.layers
            .filter((layer: Layer) => layer.visible)
            .forEach((layer: Layer): void => {
                const rLayer: RLayer = new RLayer();
                rLayer.style = this.layerStyle(layer.offset);

                let height: number = 0;
                while (height < this.pageHeight) {
                    const rBar: RBar = new RBar();
                    for (const key in layer.rhythm) {
                        const rLine: RLine = new RLine();
                        rLine.style = this.lineStyle(layer.rhythm[key], layer.lineStyle);

                        rBar.addLine(rLine);
                        height += lineHeight * layer.rhythm[key];
                    }

                    rLayer.addBar(rBar);
                }
                rPage.worksheet.addLayer(rLayer);
            });

        return rPage;
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

    /**
     * Сформировать новый слой из данных другого объекта.
     */
    static fromData(data: Layer): Layer {
        const layer: Layer = new Layer();
        layer.visible = data.visible;
        layer.offset = data.offset;
        layer.rhythm = [...data.rhythm];
        layer.lineStyle = LineStyle.fromData(data.lineStyle);
        return layer;
    }
}

/**
 * format – не используется.
 * type – тип пресета (static: основной, user: пользовательский, external: загружен из файла);
 */
export class Preset {
    format: string = '';
    name: string = '';
    type: string = '';
    fractionHeight: number = 3;
    pageHeight: number = 297;
    pageWidth: number = 210;
    pagePadding: number = 10;
    pageOrientation: string = 'portrait';
    layers: Array<Layer> = [];

    isStatic(): boolean {
        return this.type == 'static';
    }

    /**
     * Сформировать новый пресет из данных другого объекта.
     */
    static fromData(data: Preset): Preset {
        const preset: Preset = new Preset();
        preset.format = data.format;
        preset.name = data.name;
        preset.type = data.type;
        preset.fractionHeight = data.fractionHeight;
        preset.pageHeight = data.pageHeight;
        preset.pageWidth = data.pageWidth;
        preset.pagePadding = data.pagePadding;
        preset.pageOrientation = data.pageOrientation;

        data.layers.forEach((item: Layer): void => {
            preset.layers.push(Layer.fromData(item));
        });

        return preset;
    }
}

export class RPage {
    style: StyleValue;
    worksheet: RWorksheet = new RWorksheet();
}

export class RWorksheet {
    layers: Array<RLayer> = [];

    addLayer(layer: RLayer): void {
        this.layers.push(layer);
    }
}

export class RLayer {
    style: StyleValue;
    bars: Array<RBar> = [];

    addBar(bar: RBar): void {
        this.bars.push(bar);
    }
}

export class RBar {
    lines: Array<RLine> = [];

    addLine(line: RLine): void {
        this.lines.push(line);
    }
}

export class RLine {
    style: StyleValue;
}
