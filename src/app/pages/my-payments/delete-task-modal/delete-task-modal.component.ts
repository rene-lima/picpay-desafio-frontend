import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.scss']
})
export class DeleteTaskModalComponent implements OnInit {
  @Input() task = {
    id: 0, 
    name: '',
    value: '',
    date: '',
  }
  @Output() deleteTask = new EventEmitter()
  @Output() cancelChanges = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    this.cancelChanges.emit()
  }
  removeTask() {
    this.deleteTask.emit()
  }
}
