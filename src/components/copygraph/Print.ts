import html2PDF from 'jspdf-html2canvas'
import type jsPDF from 'jspdf'

export const printToPdf = (): void => {
    const nodes:HTMLCollectionOf<Element> = document.getElementsByClassName('page');
    const pages: HTMLElement[] = [];
    // Преобразовать `HTMLCollectionOf<Element>` в `HTMLElement[]`.
    // Это необязательно, но TS ругается на несоответсвие типов данных.
    // Непонятно, но с преобразованием, для параметров метода `html2PDF()` отваливается параметр `margin`.
    for (let i = 0; i < nodes.length; i++) {
      const page: Element | null = nodes.item(i);
      if (page instanceof HTMLElement)
        pages.push(page);
    }

    html2PDF(pages, {
      jsPDF: {
        format: 'a4',
      },
      autoResize: true,
      imageType: 'image/jpeg',
      imageQuality: 0.75,
      output: './pdf/copybook.pdf',
      margin: { top: -0.1, right: 0, left: 0, bottom: 0 },
      success: function(pdf: jsPDF): void {
        pdf.save(this.output);
      }
    });
  }
