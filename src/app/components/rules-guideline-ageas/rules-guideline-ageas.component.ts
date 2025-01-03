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
    {field: 'id', flex: 1, cellStyle: {'white-space': 'pre-wrap'}},
    {field: 'comment', cellStyle: {'white-space': 'pre-wrap'}, flex: 1},
  ];
  defaultColDef: ColDef = {
    wrapText: true,
    autoHeight: true,
  };
  rowData = this.addSequentialNumbers(data);
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
    'General Rule such as 562.00',
    'Value of columns can be mandatory based on how SQL is configured',
  ),
  new RuleDB('SQL', 'Value can be empty', 'General Rule', 'NULL is allowed'),
  new RuleDB(
    '.NET',
    'if (true) , then value of [columns] cannot be empty',
    '18,00² / 229.00² / 230.00 / 356.12² / 356.11² / 366.00² / 368.20² / 383.21² / 505.00² / 564.00² / 591.00² / 260.40³ / 260.50³ / 593.00³ / 519.00 / 182.20',
    '[Columns] could be 1 or multiple. ',
  ),
  new RuleDB(
    '.NET',
    'if(true) then value of %columnName% should be empty ',
    '238.00 / 365.01 / 356.00',
    'Again, Condition is optional',
  ),
  new RuleDB(
    'SQL',
    'All values of %columnName% should be unique',
    '50.00² / 234.20 / 244.00 / 317.00 / 528.00 / 529.00² / 314.00² / 578.00',
    'Either one or combination of multiple columns',
  ),
  new RuleDB(
    '.NET',
    'Value of %columnName% should not contain [RangesOfValue] ( example would be colon, comma ,underscore , ... )',
    '218,00 / 218,10 / 218,20 / 222,00 / 252.00 / 252.10 / 253.00 / 362.00 / 274.00² / 362.00² / 664.00² / 251.00³',
    '',
  ),
  new RuleDB(
    '.NET',
    'if (true) Value of [column(s)] to be between 0 and 1 (included)',
    '19.2 / 239.00 / 653.00 / 318.02 / 652.00 \n19.10 / 271.00 / 237.00* / 286.00* / 349.00 / 359.00 / 382.03 / 383.13 / 550.00 / 561.10* / 561.20* / 568.00 / 569.00 / 577.00* /  635.00 / 648.00 / 650.00 \n360.10 / 310.00 / 311.00 / 315.00 / 347.00 / 549.00 / 551.00 / 552.00** / 554.00** / 556.00 / 557.00** / 558.00** / 527.00 / 350.00 / 356.00',
    '* means Empty equals to 0 \n** means "else, it is -1 or -100% \nCondition is Optional \n All columns are floating number, aka % based ',
  ),
  new RuleDB(
    '.NET',
    'if (true) Value of %columnName% should be a value of [RangesOfValue]',
    '142.00 / 156.00 / 222.20 / 227.00 / 232.00 / 234.10 / 234.20 / 273.10 / 282.01 -> 282.18 / 285.00* / 290.00 -> 292.00 / 304.00 / 335.01 / 356.17 / 361.00 / 361.10 / 361.20 / 369.20* / 410.00* / 502.00 / 503.00 / 522.00 / 523.00/ 542.00* / 543.01* / 544.00* / 545.00* / 546.00* / 580.00* / 646.00* / 647.00* / 667.00 / 668.00 / 670.00* \n51.10 / 51.20 / 231.00 / 262.00 / 264.00 / 269.00 / 275.00* / 276.00* / 276.10* / 280.00* / 287.00 / 289.00 / 335.02 / 336.02 / 356.07 / 356.12 / 376.00 / 383.09* / 383.16 / 524.00 / 525.00 / 541.00* / 575.00 / 665.00 \n223.00 / 258.10 / 258.20 / 270.20 / 383.01 / 383.07 / 540.00 / 571.00 / 572.00 / 573.00 / 579.00 / 330.00 / 545.00',
    '* are for checks that only accept 0 or 1 , should we make a different rule for that ? Should we make a rule also for when RangeOfValue can only contain 1 value ? such as 282.18  that only accepts 10 or left blank',
  ),
  new RuleDB(
    '.NET',
    'If value of %columnName1% is %variable1% then value of %columnName2% should be %variable2%',
    '7.40 / 7.50 / 368.20 / 383.12 / 563.00 / 566.00 / 567.00 / 7.30 / 372.00 / 270.10 / 356.02',
    'ColumnsNames could come from different tables. Similar to the previous rule but with only 1 value allowed. Condition is optional',
  ),
  new RuleDB('.NET', 'LEI Code Check', '517.00 / 518.00 / 521.00 / 526.00* / 520.00² / 534.00² / 666.00', '* Cannot be empty'),
  new RuleDB(
    'SQL\n.NET',
    'if(true) Value of %columnName% should be equal or higher than %variable%',
    '284.00 / 295.00* / 305.00* / 315.20 / 318.01 / 347.01 / 360.03 / 500.00 / 501.00 / 515.00 / 516.00 / 639.00 / 640.00 / 641.00 / 642.00 / 643.00 / 644.00 / 660.00 / 661.00 / 662.00 / 663.00 / 669.00(?) / 278.00² / 279.00² / 281.00² / 378.00²(?) / 385.05³ \n260.70 / 337.00 / 382.01 / 382.02 / 383.22 / 539.00** / 588.00** / 589.00 / 659.00 \n315.10³ / 548.00³ / 553.00**³ / 574.00**** / 596.00 -> 634.00 / 306.00 / 671.00 / 669.00 / 306.00** / 260.30',
    '* means cannot be empty \nNeed more info for the rule 378 !! \n** can be 0 \n**** means else, the allowed value is 0',
  ),
  new RuleDB(
    '.NET',
    'if(true) Value of %column1% should be higher than value of %column2%',
    '358.00 / 382.04 / 363.00* / 355.03*³',
    '* can be equal to value of %column2%',
  ),
  new RuleDB(
    '.NET',
    'If (true) then value of %columnName% should be smaller or equal to %variable%',
    '209.00 / 210.00 / 100.30',
    '',
  ),
  new RuleDB(
    '.NET',
    'if(true) then values of [column] should be between -100% and 0% or blank',
    '277.10 / 277.20 / 277.30 / 359.01',
    'Did I understand correctly \n* Means that else, it would be between -(%variable1%) and 0 (ex : between -0.4 and 0) where 0.4 would come from a column',
  ),
  new RuleDB(
    '.NET',
    'if (true) Value of the Sum of [columns] should equal to 100%',
    '16.10 / 23,10 / 23,20 / 225.00 / 226.00 / 224.00 / 561.30 / 568.00 / 655.00 / 657.00',
    'the condition does not necessarily need to be present',
  ),
  new RuleDB(
    '.NET',
    'if (true) , then the table should have  [lines] from %columnName%',
    '15.10 / 15,20 / 44.00 / 84.20 / 207.00 / 260.20 / 267.20 / 267.25 / 369.10* / 535.00 \n533.00 / 113.20(?)*³ / 205.10 / 222.10',
    'Means that the table should have speficic rows of data where [lines] are the unique items \n* should be put in the "exist" rule ?',
  ),
  new RuleDB(
    '.NET',
    'Names and order consistency between two sheets/table',
    '66.10 / 66.30 / 66.20³',
    'Would like more info or examples to make I understand',
  ),
  new RuleDB(
    '.NET',
    'Consistency between sheet/columns',
    '265.00 / 537.00 \n4.00³ / 7.10³ / 7.20³ / 93.00³ / 235.00³ / 246.00³ / 272.00³ / 273.40³ / 594.00³ / 375.00³ / 248.00*',
    'For example, in table 1 , if row 1 has X and Y values, if they happen to exist in table 2, they should have the same values \n* if a model has the same asset pool, then their marings and timing of cash flows should be the same',
  ),
  new RuleDB(
    '.NET',
    'Existence check',
    '565.00 / 13.00³ / 17.00³ / 257.10³ / 257.20³ / 257.30*³/ 257.40³ / 257.50³ / 592.00³ / 636.00',
    'Means that if value from table 1 exist, they should exist in table 2\n* means the model also has to be same ',
  ),
  new RuleDB(
    '.NET',
    'One to One relationship check',
    '250.00 / 250.01 / 374.01³',
    'For example, AP_AP1 should be linked to MP_MP1 and vice versa. ',
  ),
  new RuleDB('.NET', 'if(true) must have a linked account', '374.00', ''),
  new RuleDB('.NET', 'Value of %column1% or value of %column2% has to equal to 0', '645.00', ''),
  new RuleDB('.NET', 'if(true) Value of %column1% should be between value of %column2% and 1', '382.05 / 382.06', ''),
  new RuleDB(
    '.NET',
    'if(true) then value of %columnName1% should be between 0 and 100% (included) and smaller or equal to value of %columnName2% else it should be -100% or 0% if empty',
    '559.00 / 560.00',
    '',
  ),
  new RuleDB('.NET', 'Value of %columnName1% should be between 0 and value of %columnName2%', '359.00', ''),
  new RuleDB(
    '.NET',
    'For each AP where APCF_FIIN equals to "Bonds" and "Mortages", then APCF_RL (Fix rate bond Principle Run-off) should be equal to "Sum of all Principals Fixed - Sum of all Amortization Returns + Sum of all Principals Floating',
    '3.00',
    'Might need more info. Working with rows together can be complicated.',
  ),
  new RuleDB(
    '.NET',
    'IF value of %columnName% == %variable% then Sum of [Columns] to be between 0 and 100 % (included)',
    '16.2',
    'Super Specific',
  ),
  new RuleDB('.NET', 'Value of column between 0.9 and 1', '309.00', 'Super Specific'),
  new RuleDB(
    '.NET',
    'In Equity Indices, if "Initial asset mix" or "Target asset mix", IDX_?_FSIR 1 TO 5, if one of them is different than 0 or blank , then the sum of [Rows] should be 100% or 1',
    '15.30 /  654.00* / 656.00*',
    'You check the index from 1 to 5, it has to be different than 0 or blank, and then you need to calculate the ROWS concerned together. \n* means another condition',
  ),
  new RuleDB(
    '.NET',
    'If (APCF_TP does not equal to "SURPLUS INVESTMENT ASSETS LIFE" or "SURPLUS INVESTMENT ASSETS NON LIFE" ) AND (ACPF_RL equals to "Fixed Rate Bond Principle run-off", "Mortgage Principle run-off" or "Fixed Rate Coupon (by maturity)") then the sum of Year 0 cash flow should be >=0 ',
    '30.00 ',
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
    'Super specific',
    '211.00',
    'if the line with technical provision at any year is lower than X, what comes after must be zero , including all those [lines] for example, if the line with technical provision, at year 10 has less than 0.01 , then all the year that follows must be 0 BUT ALSO the other items , must also equals to 0 starting from the same hyear as the line with provision',
  ),

  new RuleDB(
    '.NET',
    'If MPRO_ITEM is equal to "Technical provisions gross of reinsurance (Primo)", "Longevity provisions","Low interest rate provis2ions","Other provisions in front of assets (Primo)","Additional provisions in front of deferred tax asset (Primo)" then the value from year 1 to 50 cannot be negative',
    '33,10',
    'Specific. If the condition is true, then all the columns for that value cannot be negative',
  ),
  new RuleDB('.NET', 'Pool Association', '240.00', ''),
  new RuleDB('.NET', 'if (true) One of the [columns] needs to have a value equal or higher than 99%', '249.00', ''),
  new RuleDB('.NET', 'If (true) then APRO_YEAR should be between -1 and 1 else it should be 0 or empty ', '238.00', ''),
  new RuleDB('.NET', 'Minimum 1 letter', '274.00', ''),
  new RuleDB('.NET', 'Sum of [columns] equals to [columns]', '39.00', ''),
  new RuleDB('.NET', 'Value should be between 0 and 50 (included)', '547.00', ''),
  new RuleDB('.NET', 'if(true) then value of %columnName% should be 0 or blank', '236.00', ''),
  new RuleDB(
    '.NET',
    'if(true) then AP_TAMFI > 0 , AP_ACM and AP_ACB cannot be zero together , AP_MVM and AP_MVB cannot be zero together',
    '26.00',
    '',
  ),
  new RuleDB(
    '.NET',
    'if(true)value of %columnName1% should be between 0 and 1 or else it should be between negative value of %columnName2% and 0',
    '359',
    '',
  ),
  new RuleDB(
    '.NET',
    'if(true) then all values below year 49 has to be lower',
    '638.00',
    '',
  ),
  new RuleDB(
    '.NET',
    'Super specific , will need to read it fully',
    '590',
    'Check the rule itself in the documentation',
  ),
  new RuleDB(
    '???',
    'I do not understand. I need an example from mohammed',
    '658.00(w) \n  78.10(w)',
    'Need more info \n (w) means I need to wait for mohammed',
  ),
  new RuleDB('???', 'c# Method ???', '365.00 / 379.00 ->  386.02 ', 'Need more info'),
  new RuleDB(
    '???',
    'Redundant, can be ignored',
    '273.20 / 316.00(only string) / 570.00³ / 530.00 / 595.00 (floating number only pos or neg) / 651.00(all columns floating) / 25.00 and 24(sql will not round it)',
    'Foreign key should work automatically in SQL',
  ),
];
