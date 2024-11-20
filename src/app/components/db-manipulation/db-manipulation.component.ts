/* eslint-disable @typescript-eslint/no-explicit-any */
import {CommonModule} from '@angular/common';
import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
import * as _ from 'lodash';
import {Observable, of, shareReplay, tap} from 'rxjs';
import {LoadingService} from 'src/app/services/loading.service';
import {RiskService} from 'src/app/services/risk.service';

@Component({
  selector: 'app-db-manipulation',
  standalone: true,
  imports: [AgGridAngular, CommonModule, ReactiveFormsModule],
  providers: [RiskService],
  templateUrl: './db-manipulation.component.html',
  styleUrl: './db-manipulation.component.scss',
})
export class DbManipulationComponent {
  private gridApi!: GridApi<any>;
  riskData: Observable<any> = new Observable();
  isEditing = signal<boolean>(false);
  tableSelection: FormGroup;

  colDefs: ColDef[] = [];
  themeClass = 'ag-theme-quartz';
  rowData = [];
  originalData = [];

  constructor(
    private riskService: RiskService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.tableSelection = this.fb.group({
      selection: [null],
    });
    this.tableSelection.valueChanges.subscribe(({selection}) => {
      switch (true) {
        case selection == 'APLife':
          this.fetchRiskData(() => this.riskService.getApLife());
          break;
        case selection == 'BondIndices':
          this.fetchRiskData(() => this.riskService.getBondIndices());
          break;
        default:
          this.riskData = of([]);
      }
    });
  }

  reset() {
    this.rowData = _.cloneDeep(this.originalData);
    this.gridApi.setGridOption('rowData', this.rowData);
  }

  save() {
    const dataToBeSent = this.rowData.filter((el: {modified: boolean}) => el.modified == true);
    console.log(dataToBeSent);
    dataToBeSent.length == 0 && alert('No Data modified');
    const selection = this.tableSelection.value.selection;
    switch (true) {
      case selection == 'APLife':
        this.loadingService.show();
        this.riskService.editApLife(this.rowData).subscribe(() => this.loadingService.hide());
    }
  }

  onCellValueChanged(event: any) {
    event.data.modified = true;
  }

  onCellEditingStarted() {
    this.isEditing.set(true);
  }

  onCellEditingStopped() {
    this.isEditing.set(false);
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  fetchRiskData(serviceCall: () => Observable<any>) {
    this.loadingService.show();
    this.riskData = serviceCall().pipe(
      tap(d => {
        this.rowData = d.riskData.map((data: any) => ({...data, modified: false}));
        this.originalData = d.riskData.map((data: any) => ({...data, modified: false}));
        this.colDefs = d.columns;
        this.loadingService.hide();
      }),
      shareReplay(),
    );
  }
}

export const rowData = [
  {
    CustomerId: 1,
    FirstName: 'Alice',
    LastName: 'Johnson',
    Email: 'alice.johnson@example.com',
    Orders: [
      {
        OrderId: 101,
        CustomerId: 1,
        OrderDate: '2023-11-01T10:30:00Z',
      },
      {
        OrderId: 102,
        CustomerId: 1,
        OrderDate: '2023-11-05T14:45:00Z',
      },
    ],
  },
  {
    CustomerId: 2,
    FirstName: 'Bob',
    LastName: 'Smith',
    Email: 'bob.smith@example.com',
    Orders: [
      {
        OrderId: 103,
        CustomerId: 2,
        OrderDate: '2023-10-20T09:15:00Z',
      },
    ],
  },
  {
    CustomerId: 3,
    FirstName: 'Charlie',
    LastName: 'Davis',
    Email: 'charlie.davis@example.com',
    Orders: [
      {
        OrderId: 104,
        CustomerId: 3,
        OrderDate: '2023-10-25T16:30:00Z',
      },
      {
        OrderId: 105,
        CustomerId: 3,
        OrderDate: '2023-11-03T11:00:00Z',
      },
      {
        OrderId: 106,
        CustomerId: 3,
        OrderDate: '2023-11-06T13:15:00Z',
      },
    ],
  },
  {
    CustomerId: 4,
    FirstName: 'Diana',
    LastName: 'Taylor',
    Email: 'diana.taylor@example.com',
    Orders: [],
  },
  {
    CustomerId: 5,
    FirstName: 'Eve',
    LastName: 'Miller',
    Email: 'eve.miller@example.com',
    Orders: [
      {
        OrderId: 107,
        CustomerId: 5,
        OrderDate: '2023-10-28T12:45:00Z',
      },
    ],
  },
  {
    CustomerId: 6,
    FirstName: 'Frank',
    LastName: 'Brown',
    Email: 'frank.brown@example.com',
    Orders: [
      {
        OrderId: 108,
        CustomerId: 6,
        OrderDate: '2023-11-02T15:10:00Z',
      },
      {
        OrderId: 109,
        CustomerId: 6,
        OrderDate: '2023-11-05T08:25:00Z',
      },
    ],
  },
  {
    CustomerId: 7,
    FirstName: 'Grace',
    LastName: 'Wilson',
    Email: 'grace.wilson@example.com',
    Orders: [
      {
        OrderId: 110,
        CustomerId: 7,
        OrderDate: '2023-10-15T07:30:00Z',
      },
    ],
  },
  {
    CustomerId: 8,
    FirstName: 'Henry',
    LastName: 'Moore',
    Email: 'henry.moore@example.com',
    Orders: [
      {
        OrderId: 111,
        CustomerId: 8,
        OrderDate: '2023-10-29T10:20:00Z',
      },
      {
        OrderId: 112,
        CustomerId: 8,
        OrderDate: '2023-11-07T14:40:00Z',
      },
    ],
  },
  {
    CustomerId: 9,
    FirstName: 'Isabella',
    LastName: 'Thomas',
    Email: 'isabella.thomas@example.com',
    Orders: [
      {
        OrderId: 113,
        CustomerId: 9,
        OrderDate: '2023-10-18T11:50:00Z',
      },
    ],
  },
  {
    CustomerId: 10,
    FirstName: 'Jack',
    LastName: 'White',
    Email: 'jack.white@example.com',
    Orders: [],
  },
];
