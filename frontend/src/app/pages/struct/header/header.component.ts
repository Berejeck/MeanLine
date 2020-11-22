import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { DataSharingService } from '../../../services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;
  fullName = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    });
    this.fullName = 'AAA'; // localStorage.getItem('fullName');
  }

  ngOnInit(): void {
    if ( this.userService.isLoggedIn() ) {
      this.isUserLoggedIn = true;
    }
  }

  onLogout(): void {
    this.userService.deleteToken();
    this.isUserLoggedIn = false;
    this.fullName = '';
    this.router.navigate(['/login']);
  }
}
