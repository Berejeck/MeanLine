import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faFacebook, faTwitter, faTwitch, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faCoffee = faCoffee;
  faGithub = faGithub;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faTwitch = faTwitch;
  faLinkedin = faLinkedin;

  constructor() { }

  ngOnInit(): void {
  }

}
