/**
 * Вместо Style, по идее можно было бы использовать `import {CSSProperties} from "vue";`,
 * но ведет оно себя очень странно.
 */

export class Style {
    [key: string]: any;
}