import { formatCurrency, formatDate, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableComponent } from './payments-table.component';

registerLocaleData(localePt, 'pt-BR');

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsTableComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a <tr> row with info', () => {
    const mock = [
      {
        id: 6,
        name: 'Hurleigh Malitrott',
        username: 'hmalitrott5',
        title: 'Developer IV',
        value: 43.62,
        date: '01/01/21',
        image: 'https://robohash.org/impeditconsequuntureveniet.png?size=150x150&set=set1',
        isPayed: true
      }
    ];

    component.payments = mock;
    fixture.detectChanges();

    const tableRows: NodeListOf<HTMLTableRowElement> = fixture.nativeElement.querySelectorAll('tr');

    expect(tableRows.length).toBe(2);

    // Header row
    let headerRow = tableRows[0];
    expect((headerRow.cells[0].childNodes[0] as HTMLDivElement).innerText).toBe('Usuário');
    expect((headerRow.cells[1].childNodes[0] as HTMLDivElement).innerText).toBe('Título');
    expect((headerRow.cells[2].childNodes[0] as HTMLDivElement).innerText).toBe('Data');
    expect((headerRow.cells[3].childNodes[0] as HTMLDivElement).innerText).toBe('Valor');
    expect((headerRow.cells[4].childNodes[0] as HTMLDivElement).innerText).toBe('Pago');

    // Data rows
    let row1 = tableRows[1];
    expect((row1.cells[0].childNodes[0] as HTMLDivElement).innerText).toBe(mock[0].name);
    expect((row1.cells[1].childNodes[0] as HTMLDivElement).innerText).toBe(mock[0].title);

    const dateFormatted = formatDate(mock[0].date, 'd MMM y', 'pt-BR');
    expect((row1.cells[2].childNodes[0] as HTMLDivElement).innerText).toBe(dateFormatted || '1 Jan 2021');

    const valueFormatted = formatCurrency(mock[0].value, 'pt-BR', 'R$', 'BRL');
    expect((row1.cells[3].childNodes[0] as HTMLDivElement).innerText).toBe(valueFormatted || `R$${mock[0].value}`);
    console.log(row1.cells[4].childNodes[0]);
    expect((row1.cells[4].querySelector('input') as HTMLInputElement).checked).toBeTrue();
  });
});
