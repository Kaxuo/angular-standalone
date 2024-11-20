/* eslint-disable @typescript-eslint/no-explicit-any */
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rules-guideline-ageas',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './rules-guideline-ageas.component.html',
  styleUrl: './rules-guideline-ageas.component.scss',
})
export class RulesGuidelineAgeasComponent {
  private gridApi!: GridApi<any>;
  themeClass = 'ag-theme-quartz';

  colDefs: ColDef[] = [{field: 'rules'}, {field: 'id'}, {field: 'comment'}];
  defaultColDef: ColDef = {
    flex: 1,
    wrapText: true,
    autoHeight: true,
  };
  rowData = [
    new RuleDB(
      'SQL - Data type declaration',
      'General Rule Y',
      'SQL assigns a certain type to columns , prevent other types to be input',
    ),
    new RuleDB(
      '.NET - IF %columnName% == %variable% then Sum of [Columns] to be between 0 and 100 % (included)',
      '16,2',
      'Should 0 and 100 % be dynamic ?',
    ),
    new RuleDB('.NET - Value of %columnName% to be between 0 and 1 (included)', '19,2', 'Should 0 and 1 be dynamic ?'),
    new RuleDB('.NET - Value of %columnName% should be a value of [RangesOfValue]', '142,00 ; 156,00', ''),
    new RuleDB('Unknown Rules', '205,10', 'Need more info'),
    new RuleDB('Formulas ?', '218,00 ; 218,10 ; 218,20 ; 222,00', 'Need more info'),
  ];

  ngOnInit() {
    console.log(this.rowData);
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  createExcelFromJSON(jsonData: any[], fileName: string) {
    // Step 1: Convert JSON to a Worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Step 2: Create a Workbook and Append the Worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Step 3: Write the Workbook to a File
    XLSX.writeFile(workbook, fileName);

    console.log(`Excel file '${fileName}' created successfully!`);
  }
}

export class RuleDB {
  rules: string;
  id: string;
  comment: string;
  constructor(rules: string, id: string, comment: string) {
    this.rules = rules;
    this.id = id;
    this.comment = comment;
  }
}
