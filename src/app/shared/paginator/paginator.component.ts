import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() nPage = 5;
  nPageFor = [];
  activePage = 1;

  constructor() { }

  ngOnInit(): void {
    this.nPageFor = new Array(this.nPage);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.nPage) {
      this.activePage = page;
    }
  }
}
