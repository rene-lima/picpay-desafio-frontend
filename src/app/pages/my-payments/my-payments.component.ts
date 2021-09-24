import { Component, OnInit } from '@angular/core';
import { convertDateToBRFormat, convertHours, currencyFormat } from '../../../assets/utils'
import api from '../../../../api'
import { serialize, copy } from '../../../assets/utils';
import { Router } from '@angular/router'

@Component({
  selector: 'my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {

  tasks = []
  tHeaders = ['Usuário', 'Título', 'Data', 'Valor', 'Pago']
  filterKeys = {
    'Usuário': { id: 'name', label: 'Usuário' },
    'Título': { id: 'title', label: 'Título' },
    'Data': { id: 'date', label: 'Data' },
    'Valor': { id: 'value', label: 'Valor' },
    'Pago': { id: 'isPayed', label: 'Pago' }
  }
  filterBy = 'Usuário'
  search = ''
  filters = ['Usuário', 'Título', 'Valor']
  changeTaskModal = false
  deleteTaskModal = false
  filterMask = ''
  totalItems = ''
  task = {
    id: 0,
    name: '',
    username: '',
    title: '',
    value: '',
    date: '',
    hour: '',
    isPayed: false
  }
  totalPages = 1
  searchParams = {
    _page: 1,
    _limit: 10,
    _sort: 'name',
    _order: 'asc'
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getTasks()
  }
  changePageSize(pageSIze) {
    this.searchParams._limit = pageSIze
    this.changePage(1)
    this.getTasks()
  }
  changePage(page) {
    if (page <= this.totalPages && page > 0) {
      this.searchParams._page = page
      this.getTasks()
    }
  }
  getTasks() {
    return api.get(`/tasks/?${serialize(this.searchParams)}`)
      .then(resp => {
        this.tasks = resp.data
        this.totalPages = Math.ceil(resp.headers["x-total-count"] / this.searchParams._limit)
        this.totalItems = resp.headers["x-total-count"]
      })
  }
  formatDate(date) {
    if (!date) return
    const dateToString = new Date(date)
    return convertDateToBRFormat(dateToString)
  }
  formatHours(date) {
    if (!date) return
    const dateToString = new Date(date)
    return convertHours(dateToString)
  }
  formatValue(value) {
    if (!value) return
    return currencyFormat(value)
  }
  showModalChangeTask(id: any) {
    const task = copy(this.tasks.find(task => task.id = id))
    window.scroll(0, 0)
    this.setTaskData(task)
    this.changeTaskModal = true
  }
  showModalDeleteTask(id: any) {
    const task = copy(this.tasks.find(task => task.id = id))

    window.scroll(0, 0)
    this.setTaskData(task)
    this.deleteTaskModal = true
  }
  closeTaskChange() {
    this.dataTaskClear()
    this.deleteTaskModal = false
    this.changeTaskModal = false
  }
  startTaskChangeFlow(task) {
    if (task.id) return this.editTask(task)
    this.addTask(task)
  }
  setTaskData(task) {
    if (task && task.id) {
      const formatTask = task
      formatTask.hour = convertHours(task.date, 'hh:mm').toString()
      formatTask.date = convertDateToBRFormat(task.date, 'DD/MM/YYYY')
      this.task = formatTask
    }
    else {
      this.dataTaskClear()
    }
  }
  addTask(task) {
    return api.post(`/tasks`, task)
      .then(() => {
        this.getTasks()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=> {
        this.closeTaskChange()
      })
  }
  editTask(task) {
    return api.put(`/tasks/${task.id}`, task)
      .then(() => {
        this.getTasks()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=> {
        this.closeTaskChange()
      })
  }
  setPayed(value, id) {
    const isPayed = value

    return api.patch(`/tasks/${id}`, { isPayed })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  deleteTask() {
    return api.delete(`/tasks/${this.task.id}`)
    .then(() => {
      this.getTasks()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(()=> {
      this.closeTaskChange()
    })
  }
  dataTaskClear() {
    this.task = {
      id: null,
      name: '',
      username: '',
      title: '',
      value: '',
      date: '',
      hour: '',
      isPayed: false
    }
  }
  searchParamsClear() {
    this.search = ''
    this.searchParams = {
      _page: 1,
      _limit: this.searchParams._limit,
      _sort: 'name',
      _order: 'asc'
    }
  }
  changeFilterType() {
    this.searchParamsClear()
  }
  setOrder({ order, sortBy }) {
    this.searchParams._sort = this.filterKeys[sortBy].id
    this.searchParams._order = order
    this.getTasks()
  }
  searchByFilter(value) {
    if(value) {
      const keyFilter = this.filterKeys[this.filterBy].id
      this.searchParams[keyFilter] = value
      this.getTasks()
    }
  }
  changeSearch(value) {
    if (!value) {
      this.searchParamsClear()
      this.getTasks()
    }
  }
}
