import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from '../../../services/data-sharing.service';

import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private dataSharingService: DataSharingService) { }

  model = {
    email : '',
    password: ''
  };
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    console.log('Oninit -< signin', this.userService);
    if ( this.userService.isLoggedIn() ) {
      this.router.navigateByUrl('/boxview');
    }
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      ( res: any) => {
        console.log(res);
        this.userService.setToken(res.token);
        this.userService.setFullName(res.fullName, res.email);
        this.dataSharingService.isUserLoggedIn.next(true);
        this.dataSharingService.userFullName.next(res.fullName);
        this.router.navigateByUrl('/boxview');
      },
      ( err: { error: { message: string; }; }) => {
        console.log('login ', err);
        this.serverErrorMessages = err.error.message;
      }
    );
  }


}
