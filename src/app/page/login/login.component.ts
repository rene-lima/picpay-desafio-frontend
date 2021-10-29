import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../core/DTO/loginDTO';
import { AccountService } from '../../service/account.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  loginHandler(login: LoginDTO) {
    this.loading = true;
    this.accountService.getAccount(login)
        .pipe(finalize(() => {
          this.loading = false;
        }))
        .subscribe(response => console.log(response));
  }
}
