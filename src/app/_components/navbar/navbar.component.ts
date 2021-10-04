import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Account } from "src/app/_models/account/account";
import { AuthService } from "src/app/_services/auth/auth.service";

@Component({
  selector: "pf-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  userAccount: Account | null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userAccount.subscribe((uac) => {
      this.userAccount = uac;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
