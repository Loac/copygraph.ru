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
