/* eslint-disable @typescript-eslint/no-explicit-any */
import {CommonModule} from '@angular/common';
import {Component, signal} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
import * as _ from 'lodash';

@Component({
  selector: 'app-db-manipulation',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './db-manipulation.component.html',
  styleUrl: './db-manipulation.component.scss',
})
export class DbManipulationComponent {
  private gridApi!: GridApi<any>;
  isEditing = signal<boolean>(false);
  colDefs: ColDef[] = [{field: 'FirstName'}, {field: 'LastName'}, {field: 'Email'}];
  defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    resizable: true,
    sortable: true,
    filter: true,
  };
  themeClass = 'ag-theme-quartz';
  rowData = rowData.map(el => ({...el, modified: false}));
  originalData = rowData.map(el => ({...el, modified: false}));

  reset() {
    this.rowData = _.cloneDeep(this.originalData);
    this.gridApi.setGridOption('rowData', this.rowData);
  }

  save() {
    console.log(this.rowData);
    console.log(this.originalData);
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
