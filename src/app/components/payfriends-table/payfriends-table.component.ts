import { Component, Input, Output, TemplateRef, ContentChild, EventEmitter } from '@angular/core';


@Component({
  selector: 'payfriends-table',
  templateUrl: './payfriends-table.component.html',
  styleUrls: ['./payfriends-table.component.scss']
})
export class PayfriendsTableComponent {
  
  @Input() tHeaders: Array<any>
  @Input() tData: Array<any>
  @Output() setOrder = new EventEmitter()
  @ContentChild("tableRow", { static: false })tableRowRef: TemplateRef<any>
  
  sortBy = ''
  order = 'any'
  
  setSort(header) {
    if(this.sortBy !== header){
      this.sortBy = ''
      this.order = 'any'
    }
    if(this.sortBy && this.order === 'desc') {
      this.order = 'any'
    }
    if(this.sortBy && this.order === 'asc') {
      this.order = 'desc'
    }
    if(!this.sortBy && this.order === 'any') {
      this.order = 'asc'
    }
    if(this.order === 'any') {
      this.sortBy = ''
    }
    if(this.sortBy && this.order === 'asc' || 'desc'){
      this.sortBy = header
    }
    if(this.sortBy && this.order === 'any'){
      this.sortBy = ''
    }
    if(this.sortBy) {
      this.setOrder.emit({
        sortBy: this.sortBy,
        order: this.order,
      })
    }
  }
}
