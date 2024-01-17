<template>
    <canvas id="canvas" width="503" height="503" style="max-height: 503px; max-width: 503px"></canvas>

<!--    <svg width="210" height="297" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">-->
<!--        <rect x="0" y="0" width="210" height="297" style="fill: white" />-->
<!--        <line x1="0" y1="40" x2="210" y2="40" stroke="black" stroke-width="1" />-->
<!--        <line x1="0" y1="80" x2="210" y2="80" stroke="black" stroke-width="1" />-->
<!--        <line x1="0" y1="120" x2="210" y2="120" stroke="black" stroke-width="1" />-->
<!--        <line x1="0" y1="160" x2="210" y2="160" stroke="black" stroke-width="1" />-->
<!--        <line x1="0" y1="200" x2="210" y2="200" stroke="black" stroke-width="1" />-->
<!--        <line x1="0" y1="240" x2="210" y2="240" stroke="black" stroke-width="1" />-->
<!--    </svg>-->
</template>

<script setup lang="ts">
    let canvas: any;
    let points: Array<Point> = [];
    let firstLine: Line;
    let secondLine: Line;

    window.onload = function() {
        let el:HTMLElement | null = document.getElementById('canvas');
        if (null == el)
            return;

        canvas = el.getContext('2d');
        el.addEventListener('click', (e) => {
            pick(new Point(e.offsetX, e.offsetY));
        });
    }

    function clearCanvas(): void {
        canvas.fillStyle = '#ffffff';
        canvas.fillRect(0, 0, 503, 503);
    }

    function drawLine(line: Line, color: string): void {
        canvas.strokeStyle = color;
        canvas.beginPath();
        canvas.moveTo(line.begin.x, line.begin.y);
        canvas.lineTo(line.end.x, line.end.y);
        canvas.stroke();
        canvas.closePath();
    }

    function drawPoint(point: Point, color: string): void {
        canvas.fillStyle = color;
        canvas.fillRect(point.x - 2, point.y - 2, 4, 4);
    }

    function pick(point: Point): void {
        if (points.length == 0)
            clearCanvas();

        points.push(point);
        drawPoint(point, '#2e49cd');

        switch (points.length) {
            case 2: {
                firstLine = new Line(points[0], points[1]);
                drawLine(firstLine, '#2e49cd');
                break;
            }
            case 4: {
                secondLine = new Line(points[2], points[3]);
                drawLine(secondLine, "#2e49cd");
                process();
                break;
            }
        }
    }

    class Point {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    class Line {
        begin: Point;
        end: Point;

        constructor(begin: Point, end: Point) {
            this.begin = begin;
            this.end = end;
        }
    }

    /**
     * Уравнение прямой Ax+By+C.
     */
    class EquationLine {
        a: number;
        b: number;
        c: number;

        constructor(line: Line) {
            this.a = line.end.y - line.begin.y;
            this.b = line.begin.x - line.end.x;
            this.c = -line.begin.x * (line.end.y - line.begin.y) + line.begin.y * (line.end.x - line.begin.x);
        }
    }

    /**
     * Векторное произведение.
     */
    function vector(ax: number, ay: number, bx: number, by: number): number {
        return ax * by - bx * ay;
    }

    /**
     * Проверка пересечения.
     */
    function intersectionCheck(a: Line, b: Line): boolean {
        const v1 = vector(b.end.x - b.begin.x, b.end.y - b.begin.y, a.begin.x - b.begin.x, a.begin.y - b.begin.y);
        const v2 = vector(b.end.x - b.begin.x, b.end.y - b.begin.y, a.end.x - b.begin.x, a.end.y - b.begin.y);
        const v3 = vector(a.end.x - a.begin.x, a.end.y - a.begin.y, b.begin.x - a.begin.x, b.begin.y - a.begin.y);
        const v4 = vector(a.end.x - a.begin.x, a.end.y - a.begin.y, b.end.x - a.begin.x, b.end.y - a.begin.y);
        return v1 * v2 < 0 && v3 * v4 < 0;
    }

    /**
     * Поиск точки пересечения.
     */
    function intersection(e1: EquationLine, e2: EquationLine): Point {
        const d = e1.a * e2.b - e1.b * e2.a;
        const dx= -e1.c * e2.b + e1.b * e2.c;
        const dy = -e1.a * e2.c + e1.c * e2.a;
        return new Point(dx / d, dy / d);
    }

    /**
     * Проверка отрезков на пересечение.
     */
    function process() {
        if (intersectionCheck(firstLine, secondLine)) {
            let e1: EquationLine = new EquationLine(firstLine);
            let e2: EquationLine = new EquationLine(secondLine);

            const point: Point = intersection(e1, e2);

            drawPoint(point, 'red');
            console.log('Отрезки пересекаются ' + point.x + ':' + point.y);
        }
        else {
            console.log('Отрезки не пересекаются');
        }

        points = [];
    }
</script>
