import { Component } from '@angular/core';

@Component({
    selector: 'app-pdf-viewer',
    imports: [],
    templateUrl: './pdf-viewer.component.html',
    styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent {
  public pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

}
