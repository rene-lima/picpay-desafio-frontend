import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth/auth.service";

@Component({
  selector: "pf-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  isInvalidCredentials: boolean = false;
  keepConnected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.accessTokenValue) {
      this.router.navigate(['/payments']);
    }
  }

  ngOnInit(): void {}

  login(): void {
    // Obs.: Essa implementação faz uma autenticação adaptadar para o Json-server.
    // Assim, algumas verificações como as da linhas 36, 
    // foram feitas para o modelo funcionar.
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password, false)
      .subscribe((res: any) => {
        if (res.length === 0) {
          this.isInvalidCredentials = true;
        } else {
          this.router.navigate(["/payments"]);
        }
      });
  }
}
