import { StyleValue } from "vue";

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
    buildPresets = async (): Promise<unknown> => {
        const presetData: Promise<unknown> = this.importPresets();
        return presetData.then((data): void => {
            if (data instanceof Array) {
                data.forEach((item: Preset) => this.presets.set(item.name, Preset.fromData(item)));
            }

            if (this.presets.size > 0) {
                this.activePresetName = 'A4 6x6';
                this.acceptPresetByName(this.activePresetName);
            }
        });
    }

    /**
     * Найти и применить пресет к Workbook.
     */
    acceptPresetByName(presetName: string): boolean {
        const preset: Preset | undefined = this.presets.get(presetName);
        if (preset == undefined) {
            return false;
        }

        this.acceptPreset(preset);
        return true;
    }

    /**
     * Получить и применить пресет из JSON-строки.
     */
    acceptPresetFromJson(json: string): boolean {
        try {
            const data: any = JSON.parse(json);
            const preset: Preset = Preset.fromData(data);
            this.acceptPreset(preset);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Применить параметры Preset к Workbook.
     */
    acceptPreset(preset: Preset): void {
        this.activePresetName = preset.name;
        this.workbook.acceptPreset(preset);
    }

    addPresetFromJson(json: string): void {
        if (null == json) {
            return;
        }

        try {
            const data: any = JSON.parse(json);
            this.addPresetFromData(data);
        } catch (e) {
            console.error('Can\'t add preset from JSON.')
        }
    }

    addPresetFromData(data: any): void {
        if (null == data) {
            return;
        }

        try {
            const preset: Preset = Preset.fromData(data);
            this.addPreset(preset);
        } catch (e) {
            console.error('Can\'t add preset from Data.')
        }
    }

    /**
     * Добавить пресет в список пресетов.
     */
    addPreset(preset: Preset): void {
        this.presets.set(preset.name, preset);
    }

    /**
     * Удалить пресет, если он существует и не является статическим.
     */
    removePresetByName(presetName: string): void {
        const preset: Preset | undefined = this.presets.get(presetName);

        if (undefined == preset)
            return;
        if (preset.isStatic())
            throw new Error('You can\'t remove static preset');

        this.presets.delete(presetName);
    }

    /**
     * Добавить или перезаписать пользовательский пресет.
     */
    savePreset(presetName: string): void {
        const preset: Preset | undefined = this.presets.get(presetName);
        this.activePresetName = presetName;

        if (null != preset && preset.isStatic())
            throw new Error('You can\'t rewrite static preset');

        this.presets.set(presetName, this.extractPreset(presetName));
    }

    listPreset(): Array<string> {
        const list: Array<string> = [];
        this.presets.forEach((value: Preset): void => {
            list.push(value.name);
        });
        return list;
    }

    /**
     * Сформировать Preset из Workbook.
     * Метод также добавит имя пресету и выставит ему пользовательский тип.
     */
    extractPreset(presetName: string): Preset {
        const preset: Preset = this.workbook.extractPreset();
        preset.type = 'user';
        preset.name = presetName;
        return preset;
    }

    exportPresetToJson(presetName: string): string {
        const preset: Preset | undefined = this.presets.get(presetName);
        if (undefined == preset) {
            throw new Error('Preset not found.');
        }

        return JSON.stringify(preset);
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
        layer.rhythm = [2,2,2,2,2];
        layer.barHeight = 36;
        layer.barMargin = 4;
        layer.barPadding = 2;
        layer.lineAngle = 0;
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
    layerStyle(layer: Layer): StyleValue {
        return {
            // marginTop: (this.fractionHeight * offset) * -1 + 'mm'
        }
    }

    barStyle(layer: Layer): StyleValue {
        return {
            height: layer.barHeight + 'mm',
            marginTop: this.fractionHeight * layer.barMargin + 'mm',
            paddingTop: this.fractionHeight * layer.barPadding + 'mm',
        }
    }

    /**
     * Сформировать столь отображения линии.
     */
    lineStyle(layer: Layer, rhythm: number): StyleValue {
        return {
            height: this.fractionHeight * rhythm + 'mm',
            borderTop: layer.lineStyle.width + 'px ' + layer.lineStyle.style + ' ' + layer.lineStyle.color,
        }
    }

    guideStyle(layer: Layer, rhythm: number, translate: number): StyleValue {
        return {
            height: this.fractionHeight * rhythm + 'mm',
            width: layer.barHeight / Math.sin(layer.lineAngle * Math.PI / 180) + 'mm',
            borderTop: layer.lineStyle.width + 'px ' + layer.lineStyle.style + ' ' + layer.lineStyle.color,
            transform: 'translate(' + translate + 'mm, 0) rotate(' + (180 - layer.lineAngle) +'deg)',
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

        this.layers
            .filter((layer: Layer) => layer.visible)
            .forEach((layer: Layer): void => {
                const rLayer: RLayer = new RLayer();
                rLayer.style = this.layerStyle(layer);

                // Добавить класс, чтобы изменить стили
                if (layer.lineAngle > 0)
                    rLayer.class = "guides";

                let height: number = 0;
                while (height < this.pageHeight && layer.barHeight > 1) {
                    const rBar: RBar = new RBar();
                    rBar.style = this.barStyle(layer);
                    let translate: number = 0;
                    for (const key in layer.rhythm) {
                        const rLine: RLine = new RLine();

                        translate += layer.rhythm[key] * this.fractionHeight;
                        rLine.style = layer.lineAngle == 0
                            ? this.lineStyle(layer, layer.rhythm[key])
                            : this.guideStyle(layer, layer.rhythm[key], translate);

                        rBar.addLine(rLine);
                    }

                    rLayer.addBar(rBar);
                    height += layer.barHeight + layer.barMargin;
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
    barHeight: number = 0;
    barMargin: number = 0;
    barPadding: number = 0;
    lineAngle: number = 0;
    rhythm: Array<number> = [];
    lineStyle: LineStyle = new LineStyle();

    /**
     * Сформировать новый слой из данных другого объекта.
     */
    static fromData(data: Layer): Layer {
        const layer: Layer = new Layer();
        layer.visible = data.visible;
        layer.offset = data.offset;
        layer.barHeight = data.barHeight;
        layer.barMargin = data.barMargin;
        layer.barPadding = data.barPadding;
        layer.lineAngle = data.lineAngle;
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
    static fromData(data: any): Preset {
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
    class: string = "";
    bars: Array<RBar> = [];

    addBar(bar: RBar): void {
        this.bars.push(bar);
    }
}

export class RBar {
    style: StyleValue;
    lines: Array<RLine> = [];

    addLine(line: RLine): void {
        this.lines.push(line);
    }
}

export class RLine {
    style: StyleValue;
}
