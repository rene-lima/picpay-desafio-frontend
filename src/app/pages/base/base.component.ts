import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import api from '../../../../api'
import BrowserStorage from '../../../assets/utils/browser-storage'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  profile = false
  userData = {
    id: '',
    name: '',
    username: '',
    avatar: '',
    email: ''
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.login()
  }
  showProfile() {
    this.profile = !this.profile
  }
  logout() {
    BrowserStorage.clear()
    this.router.navigate(['login'])
  }
  login() {
    return api.get('/auth/me')
      .then(({ data }) => {
        this.userData = data.userData
      })
      .catch(() => {
        BrowserStorage.clear()
        this.router.navigate(['login'])
      })
  }
}
