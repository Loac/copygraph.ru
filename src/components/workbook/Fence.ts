
export class Fence {
  fenceHeight: number = 30;
  fenceMargin: number = 10;
  fractions: number = 10;
  fractionHeight: number = 5;
  baseCoverage: number = 4;
  basePosition: number = 3;
  baseHeight: number = 10;
  baseTop: number = 10;
  baseBorderColor: string = "green";
  baseBorderStyle: string = "solid";
  baseBorderWidth: number = 1;

  fenceHeightMm(): string {
    return this.fenceHeight + 'mm';
  }

  fenceMarginMm(): string {
    return this.fenceMargin + 'mm';
  }

  fractionHeightMm(): string {
    return this.fractionHeight + 'mm';
  }

  baseHeightMm(): string {
    return this.baseHeight + 'mm';
  }

  baseTopMm(): string {
    return this.baseTop + 'mm';
  }

  baseBorderWidthPx(): string {
    return this.baseBorderWidth + 'px';
  }

  update(): void {
    this.fractionHeight = this.fenceHeight / this.fractions;
    this.baseHeight = this.fractionHeight * this.baseCoverage;
    this.baseTop = this.fractionHeight * this.basePosition;
  }
}
