<template>
    <div style="padding: 10mm">
        <svg
            :width="width"
            :height="height"
            viewBox="-20 -20 420 520"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line v-for="(line, index) in lines"
                  :x1="line.begin.x"
                  :y1="line.begin.y"
                  :x2="line.end.x"
                  :y2="line.end.y"
                  stroke="black"
                  stroke-width="1"
                  :key="index"
            />

            <line
                  :x1="dash.begin.x"
                  :y1="dash.begin.y"
                  :x2="dash.end.x"
                  :y2="dash.end.y"
                  stroke="black"
                  stroke-width="1"
            />
            <line
                  :x1="left.begin.x"
                  :y1="left.begin.y"
                  :x2="left.end.x"
                  :y2="left.end.y"
                  stroke="black"
                  stroke-width="1"
            />
        </svg>
    </div>

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

    const lines: Array<Line> = [];
    const width: number = 400;
    const height: number = 500;
    const barWidth: number = 400;
    const barHeight: number = 100;
    for (let y = 0; y <= height; y = y + barHeight) {
        console.log(y)
        const begin: Point = new Point(0, y);
        const end: Point = new Point(width, y);

        lines.push(new Line(begin, end));
    }

    const left: Line = new Line(new Point(9,300), new Point(9,height));
    const dash: Line = new Line(new Point(220, 50), new Point(0, 0))

    const angle: number = 120 * Math.PI / 180;
    dash.end.x = dash.begin.x + 320 * Math.cos(angle);
    dash.end.y = dash.begin.y + 320 * Math.sin(angle);

    // dash.end.x = ((dash.end.x-dash.begin.x)*(left.begin.y-dash.begin.y)-(dash.end.y-dash.begin.y)*(left.begin.x-dash.begin.x))/((dash.end.y-dash.begin.y)*(left.end.x-left.begin.x)-(dash.end.x-dash.begin.x)*(left.end.y-left.begin.y));
    // dash.end.y = ((left.end.x-left.begin.x)*(left.begin.y-dash.begin.y)-(left.end.y-left.begin.y)*(left.begin.x-dash.begin.x))/((dash.end.y-dash.begin.y)*(left.end.x-left.begin.x)-(dash.end.x-dash.begin.x)*(left.end.y-left.begin.y));

    // dash 12
    // left 34
    const x =
        ((dash.begin.x * dash.end.y - dash.begin.y * dash.end.x) * (left.begin.x - left.end.x) - (dash.begin.x - dash.end.x) * (left.begin.x * left.end.y - left.begin.y * left.end.x)) /
        ((dash.begin.x - dash.end.x) * (left.begin.y - left.end.y) - (dash.begin.y - dash.end.y) * (left.begin.x - left.end.x))
    const y =
        ((dash.begin.x * dash.end.y - dash.begin.y * dash.end.x) * (left.begin.y - left.end.y) - (dash.begin.y - dash.end.y) * (left.begin.x * left.end.y - left.begin.y * left.end.x)) /
        ((dash.begin.x - dash.end.x) * (left.begin.y - left.end.y) - (dash.begin.y - dash.end.y) * (left.begin.x - left.end.x))

    dash.end.x = x;
    dash.end.y = y;

    console.log(dash.end.x, ':', dash.end.y)


// function peresechenie(p1,p2, p3,p4: Points): boolean;
//   // p1 - начало 1ого отрезка, p2 - конец 1ого отрезка
//   // p3 - начало 2ого отрезка, p4 - конец 2ого отрезка
// var ua,ub: double;
// begin
//   ua:=
//   ub:=

//   // если 'ua' и 'ub' принадлежат [0,1] то отрезки пересекаются
//   if ((ua>=0) and (ua<=1)) and ((ub>=0) and (ub<=1)) then result:=true else result:=false;
// end;
    // lines.push()
</script>
