import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: false
})
export class LoginComponent implements OnInit {
  userData: any;
  constructor() {}

  ngOnInit() {
    console.log('Login Page!!');
  }
}
