import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { convertDateToUTCFormat } from '../../../../assets/utils'

@Component({
  selector: 'change-task-modal',
  templateUrl: './change-task-modal.component.html',
  styleUrls: ['./change-task-modal.component.scss']
})
export class ChangeTaskModalComponent implements OnInit {
  @Output() changeTask = new EventEmitter()
  @Output() cancelChanges = new EventEmitter()
  @Input() task = {
    id: null,
    name: '',
    username: '',
    title: '',
    value: '',
    date: '',
    hour: '',
    isPayed: false
  }
  taskForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormTask()
  }
  taskChange() {
    const { name, username, value, title, date, hour } = this.taskForm.value
    const { id, isPayed } = this.task
    const dateUtc = convertDateToUTCFormat(date, hour)
    const task = { name, username, value, title, isPayed, date: dateUtc }

    if (id) { task['id'] = id }
    this.changeTask.emit(task)
  }
  cancel() {
    this.cancelChanges.emit()
  }
  createFormTask() {
    this.taskForm = this.formBuilder.group({
      name: [this.task.name, Validators.compose([Validators.required])],
      username: [this.task.username, Validators.compose([Validators.required])],
      title: [this.task.title, Validators.compose([Validators.required])],
      value: [this.task.value, Validators.compose([Validators.required])],
      date: [this.task.date, Validators.compose([Validators.required])],
      hour: [this.task.hour, Validators.compose([Validators.required])]
    })
  }

}
