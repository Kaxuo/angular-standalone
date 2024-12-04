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
  rowData = this.addSequentialNumbers(data);
  levelTwoData = this.addSequentialNumbers(levelTwo);
  levelThreeData = this.addSequentialNumbers(levelThree);
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

  addSequentialNumbers<T>(data: T[]): (T & {num: number})[] {
    return data.map((el, i) => ({...el, num: i + 1}));
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
  new RuleDB(
    'SQL',
    'All values of %columnName% should be unique',
    '234.20 / 244.00 / 528.00 / 529.00 / 314.00²²',
    'Either one or combination of multiple columns',
  ),
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
    '218,00 / 218,10 / 218,20 / 222,00 / 252.00 / 252.10 / 253.00 / 362.00 / 274.00² / 362.00² / 251.00³',
    '² mean level 2 rules from the sheet of Mohammed , ³ for level 3 rules ',
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
  new RuleDB('.NET', 'LEI Code Check', '517.00 / 521.00 / 526.00 / 520.00* / 666.00', '* Can be empty'),
  new RuleDB(
    'SQL\n.NET',
    'if(true) Value of %columnName% should be equal or higher than %variable%',
    '284.00 / 295.00 / 305.00 / 315.20 / 318.01 / 347.01 / 335.01 / 356.00 / 356.02 / 360.03 / 500.00 / 501.00 / 515.00 / 516.00 / 639.00 / 640.00 / 641.00 / 642.00 / 643.00 / 644.00 / 660.00 / 661.00 / 662.00 / 663.00 / 278.00² / 279.00² / 281.00² / 378.00²(?)',
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
    'ColumnsNames could come from different tables',
  ),
  new RuleDB(
    '.NET',
    'if (true) , then the table should have  [lines] from %columnName%',
    '15.10 / 15,20 / 84.20 / 207.00 / 260.20 / 267.20 / 267.25 / 369.10 / 535.00 / 533.00',
    'Conditions could be optional',
  ),
  new RuleDB(
    '.NET',
    'In Equity Indices, if "Initial asset mix" or "Target asset mix", IDX_?_FSIR 1 TO 5, if one of them is different than 0 or blank , then the sum of [Rows] should be 100% or 1',
    '15.30',
    'You check the index from 1 to 5, it has to be different than 0 or blank, and then you need to calculate the ROWS concerned together.',
  ),
  new RuleDB(
    '.NET',
    'if (true) , then value of [columns] should not be empty',
    '18,00 / 229.00 / 356.12 / 356.11 / 366.00 / 368.20 / 383.21 / 505.00 / 564.00 / 591.00 / 635.00 / 260.40³ / 260.50³ / 593.00³',
    'Columns could be 1 or multiple \nIt is the same rule as the second rule in the first table ',
  ),
  new RuleDB(
    '.NET',
    'if (true) Value of the Sum of [columns] should equal to 100%',
    '16.10 / 23,10 / 23,20 / 225.00 / 226.00 / 224.00 / 561.30 / 568.00 / 655.00',
    'the condition does not necessarily need to be present',
  ),
  new RuleDB(
    '.NET',
    'If (APCF_TP does not equal to "SURPLUS INVESTMENT ASSETS LIFE" or "SURPLUS INVESTMENT ASSETS NON LIFE" ) AND (ACPF_RL equals to "Fixed Rate Bond Principle run-off", "Mortgage Principle run-off" or "Fixed Rate Coupon (by maturity)") then the sum of Year 0 cash flow should be >=0 ',
    '30.00',
    'Specific. The Sum of all vertical value where the condition is true only.',
  ),
  new RuleDB(
    '.NET',
    'If APCF_RL is equals to "Floating rate Bond Principle run-off" then the year 0 cash flow should be 0 or emtpy',
    '30,01',
    '',
  ),
  new RuleDB(
    '.NET',
    'If MPRO_ITEM is equal to "Technical provisions gross of reinsurance (Primo)", "Longevity provisions","Low interest rate provisions","Other provisions in front of assets (Primo)","Additional provisions in front of deferred tax asset (Primo)" then the value from year 1 to 50 cannot be negative',
    '33,10',
    'Specific. If the condition is true, then all the columns for that value cannot be negative',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName% should be a value of [RangesOfValue]',
    '51.10 / 51.20 / 231.00 / 262.00 / 264.00 / 269.00 / 273.20 / 275.00* /276.00* / 276.10* / 280.00* / 286.00* / 287.00 / 289.00 / 356.07 / 376.00 / 383.09* / 383.12 / 383.16 / 524.00 / 525.00 / 541.00* / 563.00 / 565.00 / 566.00 / 567.00 / 575.00 / 665.00',
    'Similar to rule Num 8 in the first table \n* means 0 or 1 \nCan probably fuse this rule with the Num8',
  ),
  new RuleDB(
    '.NET',
    'Names and order consistency between two sheets/table',
    '66.10 / 66.30 / 636.00* / 66.20³',
    'Would like more info or examples to make I understand \n* Only names need to be present in another table.',
  ),
  new RuleDB(
    '.NET',
    'If MPRO_ITEM equals to one of [RangeOfValues] then MPRO_YEAR (1 to 50) should be smaller or equal to %variable%',
    '209.00 / 210.00',
    'It is "OR" and not "AND", excel is incorrect (Confirmed by Rama)',
  ),
  new RuleDB('.NET', 'If (true) then APRO_YEAR should be between -1 and 1 else it should be 0 or empty ', '238.00', ''),
  new RuleDB(
    '.NET',
    'if(true) Value of [column(s)] should be between 0 and 1 (included)',
    '19.10 / 271.00 / 237.00* / 382.03 / 383.13 / 550.00 / 561.10* / 561.20* / 568.00 / 569.00 / 577.00* / 648.00 / 650.00 / 360.10³ / 310.00³ / 311.00³ / 315.00³ / 347.00³ / 548.00³ / 549.00³ / 551.00³ / 552.00**³ / 554.00**³ / 556.00³ / 557.00**³ / 558.00**³',
    '* means Empty equals to 0 \nCondition is Optional \n All columns are floating number, aka % based \n³ means level 3 \n* means "else, it is -1 or -100%',
  ),
  new RuleDB(
    '.NET',
    'if(true) then value of %columnName% should be empty ',
    '238.00 / 365.01 / 368.20 ',
    'Again, Condition is optional',
  ),
  new RuleDB('.NET', 'Pool Association', '240.00', ''),
  new RuleDB(
    '.NET',
    'if (true) One of the [columns] needs to have a value equal or higher than 99%',
    '249.00',
    'Condition is optional',
  ),
  new RuleDB('.NET', 'One to One relationship check', '250.00 / 250.01', ''),
  new RuleDB(
    '.NET',
    'All Unique values from %table1% should also exist in %table2% in %columnName%',
    '254.70',
    'I will need to check with the rule of the first table',
  ),
  new RuleDB(
    '.NET',
    'if (true) then value should be positive',
    '260.70 / 337.00 / 382.01 / 382.02 / 519.00* / 539.00** / 588.00** / 589.00 / 659.00 / 315.10³ / 548.00³ / 553.00**³',
    'Condition optional - Can probably fuse it with "Higher than X rule" , Num 11 \n* Cannot be blank \n** can be 0',
  ),
  new RuleDB('.NET', 'Minimum 1 letter', '274.00', ''),
  new RuleDB('.NET', 'Specific , Consistency between sheet/columns', '265.00 / 537.00', ''),
  new RuleDB(
    '.NET',
    'if(true) then values of [column] should be between -100% and 0% or blank',
    '277.10 / 277.20 / 277.30',
    'Did I understand correctly',
  ),
  new RuleDB(
    '.NET',
    'if(true) Value of %column1% should be higher than value of %column2%',
    '358.00 / 382.04 / 363.00* / 383.22* / 355.03*³',
    '* can be equal to value of %column2%',
  ),
  new RuleDB('.NET', 'if(true) Value of %column1% should be between value of %column2% and 1', '382.05 / 382.06', ''),
  new RuleDB(
    '.NET',
    'if(true) then value of %columnName1% should be between 0 and 100% (included) and smaller or equal to value of %columnName2% else it should be -100% or 0% if empty',
    '559.00 / 560.00',
    'Should I split that into multiple rules ? ',
  ),
  new RuleDB(
    '.NET',
    'Super specific',
    '78.10 / 359.01 / 590.00(a) / 375.00 / 638.00 / 656.00(a)',
    'Will check again later \n(a) means they are similar',
  ),
  new RuleDB(
    '???',
    'Me no understando',
    '25.00 / 44.00 / 211.00(wtf) / 260.30 / 335.02 / 336.02 / 664.00',
    'Need more info',
  ),
  new RuleDB(
    '???',
    'Two different meaning between description and criteria',
    '349.00 / 350.0 / 530.00 / 534.00',
    'will check with mohammed \nAbout 530, it says it should be floating but in the excel it says String',
  ),
  new RuleDB('???', 'No specific rules written', '50.00 / 359.00', 'Could be just data type'),
  new RuleDB('???', 'Redundant, can be ignored', '562.00', ''),
];

export const levelThree = [
  new RuleDB(
    '.NET',
    'Consistency Check / Matching values',
    '4.00 / 7.10 / 7.20 / 93.00 / 113.20 / 235.00 / 246.00 / 272.00 / 273.40 / 594.00',
    'Might need different rules for each',
  ),
  new RuleDB(
    '.NET',
    'if (true) value of %columnName% should be equal to [RangeOfValue]',
    '7.3 / 223.00 / 258.10 / 258.20 / 270.20 / 372.00 / 383.01 / 383.07 / 540.00 / 571.00 / 572.00 / 573.00 / 579.00',
    'Similar to rule Num 8 in the first table \n* means 0 or 1 \nCan probably fuse this rule with the Num8',
  ),
  new RuleDB(
    '.NET',
    'Existence check',
    '13.00 / 17.00 / 257.10 / 257.20 / 257.30* / 257.50/ 592.00',
    'Means that if value from table 1 exist, they should exist in table \n* means the model also has to be same ',
  ),
  new RuleDB(
    '.NET',
    'if(true) must have a linked account',
    '374.00',
    '',
  ),
  new RuleDB(
    '.NET',
    'Consistency between linked account',
    '374.01',
    'each DMMP Model can only have one different investment pool',
  ),
  new RuleDB(
    '.NET',
    'if (true) then value of %columnName% should be higher or equal to %variable%',
    '385.05',
    'Same as the 11th rule in the first table, should fuse ?',
  ),
  new RuleDB(
    '.NET',
    'Value should be between 0 and 50 (included)',
    '547.00',
    '',
  ),
  new RuleDB('.NET', 'Sum of [columns] equals to [columns]', '39.00', ''),
  new RuleDB('.NET', 'if(true) then value of %columnName% should be 0 or blank', '236.00', ''),
  new RuleDB(
    '.NET',
    'Super specific',
    '26.00 / 100.30 / 574.00 / 654.00 / 671.00',
    'Will check again later. \nThe rule 654 looks a lot like 30.00',
  ),
  new RuleDB('???', 'Me no understando', '24.00 / 182.20 / 248.00 / 270.10 / 527.00 / 578.00', 'Need more info'),
  new RuleDB('???', 'Redundant, can be ignored', '570.00', 'Foreign key should work automatically in SQL'),
];
