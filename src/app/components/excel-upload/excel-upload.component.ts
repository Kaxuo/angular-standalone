import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
  selector: 'app-excel-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-upload.component.html',
  styleUrl: './excel-upload.component.scss',
})
export class ExcelUploadComponent {
  fileName = '';
  headers: string[] = [];
  csvData: any[] = [];
  constructor() {}

  onFileSelected(event: Event) {
    const ev = event.target as HTMLInputElement;
    if (!ev.files) return;
    const file: File = ev.files[0];
    if (file) {
      this.parseCSVFile(file);
    }
  }

  parseCSVFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    this.fileName = file.name;
    reader.onload = () => {
      const csv: string = reader.result as string;
      const data = csv.split('\n');
      this.headers = data[0].split(',');
      console.log(this.headers);
      const values = data.slice(1).filter(el => el != '');
      this.csvData = values.map(el => {
        const v = el.split(',');
        const finalValue = v.reduce((obj: {[key: string]: string}, item, index) => {
          obj[this.headers[index]] = item;
          return obj;
        }, {});
        return finalValue;
      });
    };
  }
}
