import { Component, OnInit } from "@angular/core";
import { AuthService } from "./_services/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title: string;
  hasAccessToken: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.title = "Desafio Picpay Front-end";
    this.authService.accessToken.subscribe((token) => {
      this.hasAccessToken = token ? true : false;
    });
  }
}
