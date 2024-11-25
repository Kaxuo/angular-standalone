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

  colDefs: ColDef[] = [
    {field: 'num', width: 75},
    {field: 'system', cellStyle: {'white-space': 'pre-wrap'}, width: 100},
    {field: 'rules', flex: 1},
    {field: 'id', flex: 1},
    // {field: 'table_column', cellStyle: {'white-space': 'pre-wrap'}},
    {field: 'comment', cellStyle: {'white-space': 'pre-wrap'}, flex: 1},
  ];
  defaultColDef: ColDef = {
    wrapText: true,
    autoHeight: true,
  };
  rowData = data.map((el, i) => ({...el, num: i + 1}));

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
  system: string;
  rules: string;
  id: string;
  table_column: string;
  comment: string;
  constructor(system: string, rules: string, id: string, table_column: string, comment: string) {
    this.system = system;
    this.rules = rules;
    this.id = id;
    this.table_column = table_column;
    this.comment = comment;
  }
}

export const twovalues = [''];

export const data = [
  new RuleDB(
    'SQL',
    'Data type declaration',
    'General Rule',
    '',
    'SQL assigns a certain type to columns , prevent other types to be input.\nHowever, should we add it to .NET too so that the user can see their error since SQL only returns generic errors',
  ),
  new RuleDB(
    'SQL',
    'Value required',
    'General Rule',
    '',
    'Value of columns can be mandatory based on how SQL is configured',
  ),
  new RuleDB('SQL', 'Value can be empty', 'General Rule', '', 'NULL is allowed'),
  new RuleDB(
    'SQL',
    'All values of %columnName% should be unique',
    '234.20 / 244.00 / 528.00',
    'RRC-Conv:RC_CONV // \nOther BS Items:OBSI_ITEM //',
    'SQL assigns a certain type to columns , prevent other types to be input',
  ),
  new RuleDB(
    '.NET',
    'IF %columnName% == %variable% then Sum of [Columns] to be between 0 and 100 % (included)',
    '16.2',
    'Equity indices:IDX_(1...5)_FSIR',
    'Should 0 and 100 % be dynamic ?',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName% to be between 0 and 1 (included)',
    '19.2 / 318.02 / 653.00 ',
    'Asset Pool UL:AP_DCRE //',
    'Should 0 and 1 be dynamic ?',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName% should not contain [RangesOfValue] ( example would be colon, comma ,underscore , ... )',
    '252.00 / 252.10 / 253.00 / 362.00',
    'Asset Pool conv:AP_AP//\nAsset Pool Ul:AP_AP//\nOther BS:OBSI_ITEM  //',
    '',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName% should be a value of [RangesOfValue]',
    '142.00 / 156.00 / 222.20 / 232.00 / 234.10 / 234.20 / 273.10 / 282.01 -> 282.18 / 285.00* / 290.00 -> 292.00 / 304.00 / 356.17 / 361.00 / 361.10 / 361.20 / 369.20* / 410.00 / 502.00 / 503.00 / 522.00 / 523.00/ 542.00* / 543.01* / 544.00* / 545.00* / 546.00* / 580.00* / 646.00* / 647.00* / 667.00 / 668.00 / 670.00*',
    'Other BS:OBSI_CUR /\nOBSI_LIFE_FSIR //\nGeneral:G_TR_FSIR //\nMP_UL:MP_RRC_Basis // \nRRC_Conv:RC_CONVENTION /RC_SWITCH_OFF_FLOOR //\nMP_CONV:MP_SII_LOB /\nMP_RiskDrive_XXXX //\nOther BS:OBSI_ITEM OBSI_INTG OBSI_TYPE_BS//\nCPDExposureType1:CP1_RISK_XXX',
    '* are for checks that only accept 0 or 1 , should we make a different rule for that ?',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName1% should be a value of %value1% AND value of %columnName2% should be different than %value2% then %columnName3% cannot be null but can be 0',
    '230.00',
    'MP Conv:MP_GPS',
    '',
  ),
  new RuleDB(
    '.NET',
    'LEI Code Check',
    '517.00 / 521.00 / 526.00',
    'OBSI_INGC_LEIC',
    '',
  ),
  new RuleDB(
    'SQL\n.NET',
    'Value of %columnName% should be equal or higher than %variable%',
    '284.00 / 295.00 / 305.00 / 315.20 / 318.01 / 347.01 / 335.01 / 356.00 / 356.02 / 360.03 / 500.00 / 501.00 / 515.00 / 516.00 / 639.00 / 640.00 / 641.00 / 642.00 / 643.00 / 644.00 / 660.00 / 661.00 / 662.00 / 663.00 ',
    'General:G_TNDTL //\nCPDexposuresType1 :CP1_COLLAT_MRA //\n AP_Conv:AP_CAPI // \nCounterPartiesType2:CP2_AP',
    'Should create the constraint in sql and also code in .NET, easy to do',
  ),
  new RuleDB(
    '???',
    "Me no understando",
    '205.10 / 222.10 / 239.00 / 306.00 / 309.00 / 316.00 / 317.00 / 595.00 -> 634.00 / 651.00 / 652.00 / 227.00 / 239.00 / 657.00 / 658.00',
    '',
    'Need more info',
  ),
  new RuleDB('.NET', 'Value of %colum1% or value of %column2% has to equal to 0', '645.00', '', ''),
  new RuleDB('???', 'c# Method ???', '365.00 / 379.00 ->  386.02 ', '', 'Need more info'),
  new RuleDB('???', 'No specific rules written', '518.00 / 545.10 / 669.00', '', 'Need more info'),
  new RuleDB('???', 'Formulas ?', '218,00 / 218,10 / 218,20 / 222,00', '', 'Need more info'),
];
