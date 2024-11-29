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
    {field: 'comment', cellStyle: {'white-space': 'pre-wrap'}, flex: 1},
  ];
  defaultColDef: ColDef = {
    wrapText: true,
    autoHeight: true,
  };
  rowData = data.map((el, i) => ({...el, num: i + 1}));
  levelTwoData = levelTwo.map((el, i) => ({...el, num: i + 1}));
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
  comment: string;
  constructor(system: string, rules: string, id: string, comment: string) {
    this.system = system;
    this.rules = rules;
    this.id = id;

    this.comment = comment;
  }
}

export const data = [
  new RuleDB(
    'SQL',
    'Data type declaration',
    'General Rule',
    'SQL assigns a certain type to columns , prevent other types to be input.\nHowever, should we add it to .NET too so that the user can see their error since SQL only returns generic errors',
  ),
  new RuleDB(
    'SQL',
    'Value required',
    'General Rule',
    'Value of columns can be mandatory based on how SQL is configured',
  ),
  new RuleDB('SQL', 'Value can be empty', 'General Rule', 'NULL is allowed'),
  new RuleDB('SQL', 'All values of %columnName% should be unique', '234.20 / 244.00 / 528.00', ''),
  new RuleDB(
    '.NET',
    'IF value of %columnName% == %variable% then Sum of [Columns] to be between 0 and 100 % (included)',
    '16.2',
    '',
  ),
  new RuleDB('.NET', 'Value of %columnName% to be between 0 and 1 (included)', '19.2 / 318.02 / 653.00 ', ''),
  new RuleDB(
    '.NET',
    'Value of %columnName% should not contain [RangesOfValue] ( example would be colon, comma ,underscore , ... )',
    '218,00 / 218,10 / 218,20 / 222,00 / 252.00 / 252.10 / 253.00 / 362.00 / 274.00² / 362.00²',
    '² mean level 2 rules from the sheet of Mohammed ',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName% should be a value of [RangesOfValue]',
    '142.00 / 156.00 / 222.20 / 232.00 / 234.10 / 234.20 / 273.10 / 282.01 -> 282.18 / 285.00* / 290.00 -> 292.00 / 304.00 / 356.17 / 361.00 / 361.10 / 361.20 / 369.20* / 410.00 / 502.00 / 503.00 / 522.00 / 523.00/ 542.00* / 543.01* / 544.00* / 545.00* / 546.00* / 580.00* / 646.00* / 647.00* / 667.00 / 668.00 / 670.00*',
    '* are for checks that only accept 0 or 1 , should we make a different rule for that ?',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName1% should be a value of %value1% AND value of %columnName2% should be different than %value2% then %columnName3% cannot be null but can be 0',
    '230.00',
    '',
  ),
  new RuleDB('.NET', 'LEI Code Check', '517.00 / 521.00 / 526.00', ''),
  new RuleDB(
    'SQL\n.NET',
    'if(true) Value of %columnName% should be equal or higher than %variable%',
    '284.00 / 295.00 / 305.00 / 315.20 / 318.01 / 347.01 / 335.01 / 356.00 / 356.02 / 360.03 / 500.00 / 501.00 / 515.00 / 516.00 / 639.00 / 640.00 / 641.00 / 642.00 / 643.00 / 644.00 / 660.00 / 661.00 / 662.00 / 663.00 / 278.00² / 279.00² / 281.00² / 378.00²',
    'Should create the constraint in sql and also code in .NET, easy to do \n ² mean level two ',
  ),
  new RuleDB('.NET', 'Value of %colum1% or value of %column2% has to equal to 0', '645.00', ''),
  new RuleDB(
    '???',
    'Me no understando',
    '205.10 / 222.10 / 239.00 / 306.00 / 309.00 / 316.00 / 317.00 / 595.00 -> 634.00 / 651.00 / 652.00 / 227.00 / 239.00 / 657.00 / 658.00',
    'Need more info',
  ),
  new RuleDB('???', 'c# Method ???', '365.00 / 379.00 ->  386.02 ', 'Need more info'),
  new RuleDB('???', 'No specific rules written', '518.00 / 545.10 / 669.00', 'Could be just data type'),
];

export const levelTwo = [
  new RuleDB(
    '.NET',
    'For each AP where APCF_FIIN equals to "Bonds" and "Mortages", then APCF_RL (Fix rate bond Principle Run-off) should be equal to "Sum of all Principals Fixed - Sum of all Amortization Returns + Sum of all Principals Floating',
    '3.00',
    'Might need more info. Working with rows together can be complicated.',
  ),
  new RuleDB(
    '.NET',
    'If value of %columnName1% is %variable1% then value of %columnName2% should be %variable2%',
    '7.40 / 7.50 / 356.12',
    'It says it is a string though ? \nColumnsNames could come from different tables',
  ),
  new RuleDB(
    '.NET',
    'if (true) , then the table should have  [lines] from %columnName%',
    '15.10 / 15,20 / 84.20 / 207.00 / 260.20 / 267.20 / 267.25 / 369.10',
    'Conditions could be optional',
  ),
  new RuleDB(
    '.NET',
    'In Equity Indices, if "Initial asset mix" or "Target asset mix" is different than 0 or blank , then the sum of [rows / Indexhn] should be 100% or 1',
    '15.30',
    'I need an example to make sure I understand.',
  ),
  new RuleDB(
    '.NET',
    'if (true) , then value of [columns] should not be empty',
    '18,00 / 229.00 / 356.11 / 366.00 / 368.20',
    'Columns could be 1 or multiple',
  ),
  new RuleDB(
    '.NET',
    'Percentage of deferred capital gains for shares should be between 0 and 1 (included)',
    '19,10 / 271.00',
    'Might need to know how the calculation is done and which columns are involved.',
  ),
  new RuleDB(
    '.NET',
    'if (true) Value of the Sum of [columns] should equal to 100%',
    '16.10 / 23,10 / 23,20 / 225.00 / 226.00 / 224.00',
    'the condition does not necessarily need to be present',
  ),
  new RuleDB(
    '.NET',
    'If (APCF_TP does not equal to "SURPLUS INVESTMENT ASSETS LIFE" or "SURPLUS INVESTMENT ASSETS NON LIFE" )AND (ACPF_RL equals to "Fixed Rate Bond Principle run-off", "Mortgage Principle run-off" or "Fixed Rate Coupon (by maturity)") then the sum of Year 0 cash flow should be >=0 ',
    '30,00',
    'Should recheck that rule, it is too specific. I am not sure about the last (year 0)',
  ),
  new RuleDB(
    '.NET',
    'If APCF_RL is equals to "Floating rate Bond Principle run-off" then the year 0 cash flow should be 0 or emtpy',
    '30,01',
    'Too Specific ? let us see if we can find another that is similar to this ...',
  ),
  new RuleDB(
    '.NET',
    'If MPRO_ITEM is equal to "Technical provisions gross of reinsurance (Primo)", "Longevity provisions","Low interest rate provisions","Other provisions in front of assets (Primo)","Additional provisions in front of deferred tax asset (Primo)" then the value from year 1 to 50 cannot be negative',
    '33,10',
    'idem above, too specific ?',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName% should be a value of [RangesOfValue]',
    '51.10 / 51.20 / 231.00 / 262.00 / 264.00 / 269.00 / 273.20 / 276.00* / 276.10* / 280.00* / 286.00* / 287.00 / 289.00 / 356.07 / 376.00',
    'Similar to rule Num 8 in the first table \n* means 0 or 1 \nCan probably fuse this rule with the Num8',
  ),
  new RuleDB(
    '.NET',
    'Names and order consistency between two sheets/table',
    '66.10 / 66.30',
    'Would like more info or examples to make I understand',
  ),
  new RuleDB(
    '.NET',
    'it is so specific that there is no way you could find another one like this',
    '78.10',
    'Please corrrect me if it is wrong',
  ),
  new RuleDB(
    '.NET',
    'If MPRO_ITEM equals to one of [RangeOfValues] then MPRO_YEAR (1 to 50) should be smaller or equal to %variable%',
    '209.00 / 210.00',
    'It is "OR" and not "AND", excel is incorrect (Confirmed by Rama)',
  ),
  new RuleDB(
    '.NET',
    'If (true) then APRO_YEAR should be between -1 and 1 else it should be 0 or empty ',
    '238.00 / ',
    '',
  ),
  new RuleDB('.NET', 'Value of %columnName% should be between 0 and 1 (included) (Empty would mean 0) ', '237.00', ''),
  new RuleDB('.NET', 'if(true) then value of %columnName% should be empty ', '238.00 / 365.01 / 368.20 ', 'Again, Condition is optional'),
  new RuleDB(
    '.NET',
    'if(true) then value of %columnName% should be 0 or 1 else it should be empty',
    '275.00',
    'Again, Condition is optional',
  ),
  new RuleDB('.NET', 'Pool Association', '240.00', ''),
  new RuleDB(
    '.NET',
    'if (true) One of the [columns] needs to have a value equal or higher than 99%',
    '249.00',
    'Again, Condition is optional',
  ),
  new RuleDB('.NET', 'One to One relationship check', '250.00 / 250.01', ''),
  new RuleDB('.NET', 'All Unique values from %table1% should also exist in %table2% in %columnName%', '254.70', ''),
  new RuleDB(
    '.NET',
    'if (true) then value should be positive',
    '260.70 / 337.00 ',
    'Condition optional - Can probably fuse it with "Higher than X rule" , Num 11',
  ),
  new RuleDB('.NET', 'Minimum 1 letter', '274.00', ''),
  new RuleDB('.NET', 'Bond / Index consistency -> Consistency between bond name, index name and Opco', '265.00', ''),
  new RuleDB(
    '.NET',
    'if(true) then values of [column] should be between -100% and 0% or blank',
    '277.10 / 277.20 / 277.30',
    'Did I understand correctly',
  ),
  new RuleDB(
    '.NET',
    'Value of %column1% should be higher than value of %column2%',
    '358.00',
    '',
  ),
  new RuleDB(
    '.NET',
    'Value of %column1% should be equal or higher than value of %column2%',
    '363.00',
    '',
  ),
  new RuleDB(
    '.NET',
    'Super specific',
    '359.01 / 590.00 / 375.00',
    '',
  ),
  new RuleDB('???', 'Me no understando', '25.00 / 44.00 / 211.00(wtf) / 260.30 / 335.02 / 336.02', 'Need more info'),
  new RuleDB('???', 'Two different meaning between description and criteria', '314.00 / 349.00 / 350', 'will check with mohammed'),
  new RuleDB('???', 'No specific rules written', '50.00 / 359.00', 'Could be just data type'),
];
