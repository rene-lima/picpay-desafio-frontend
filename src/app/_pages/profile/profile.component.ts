import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Account } from "src/app/_models/account/account";
import { AccountService } from "src/app/_services/account/account.service";
import { AuthService } from "src/app/_services/auth/auth.service";

@Component({
  selector: "pf-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  userAccount: Account | null;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userAccount.subscribe((uac) => {
      this.userAccount = uac;
      console.warn('opaaaaaa')
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  editProfile(profileFormValue: any) {
    this.userAccount.name = profileFormValue.name;
    this.userAccount.email = profileFormValue.email;
    this.userAccount.password = profileFormValue.password;

    this.accountService.editAccount(this.userAccount).subscribe((res: Account) => {
      this.authService.setUserAccountValue(res);
    });
  }
}
