import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { PaginationControlsDirective, PaginationInstance } from "ngx-pagination";

@Component({
  selector: "pf-pagination-template",
  templateUrl: "./pagination-template.component.html",
  styleUrls: ["./pagination-template.component.scss"],
})
export class PaginationTemplateComponent implements OnInit {
  @Input()
  public config: PaginationInstance;

  @Output()
  public changePageEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  isFirstPage(): boolean {
    return this.config.currentPage === 1;
  }

  isLastPage(): boolean {
    return !(
      this.config.totalItems >
      this.config.currentPage * this.config.itemsPerPage
    );
  }

  changePage(index: any) {
    this.config.currentPage = index;
    this.changePageEvent.emit(index);
  }
}
