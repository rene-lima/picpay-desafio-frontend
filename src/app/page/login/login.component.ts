import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../core/DTO/loginDTO';
import { AccountService } from '../../service/account/account.service';
import { finalize } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(private accountService: AccountService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginHandler(login: LoginDTO) {
    this.loading = true;
    this.accountService.getAccount(login)
        .pipe(finalize(() => {
          this.loading = false;
        }))
        .subscribe(response => {
          if (response.length > 0) {
            localStorage.setItem('name', response[0].name);
            localStorage.setItem('userId', response[0].id);
            this.router.navigateByUrl('/pagamentos');
          }
        });
  }
}
