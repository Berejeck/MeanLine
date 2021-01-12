import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService, private router: Router) {
    this.showSucessMessage = false;
    this.serverErrorMessages = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {

    this.userService.postUser(form.value).subscribe(
      (res: any) => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      (  err: { status: number; error: any[]; }) => {
        if (err.status === 422) {
          console.log(err.error);
          this.serverErrorMessages = 'Indirizzo Email già presente';
        } else {
          console.log('errore: ', err);
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    );
  // */
  }

  resetForm(form: NgForm): void {
    this.userService.selectedUser = {
      fullName: '',
      email: this.userService.selectedUser.email,
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
    this.router.navigate(['/login']);
  }

}
