import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: SocialUser| undefined;
  userCurrent:any;
  usertest: SocialUser | undefined;
  public credentials = {
    idSocialMedia: '',
    firstName: '',
    surname: '',
    name: '',
    personPhoto: '',
    token: ''

  };
  constructor(public authService: AuthService,private dataService: DataService, public router: Router,private readonly _authService: SocialAuthService) {
  }

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {
      this.user = user;
    });

  }

  signOut(): void {
    this._authService.signOut();
    localStorage.removeItem('Cur_user');
  }

  getdata() {
    /*if(localStorage.getItem('Cur_user') != null && this.userCurrent == null){
      this.userCurrent = localStorage.getItem('Cur_user');
      console.log(this.userCurrent);
    }*/
    if (this.usertest != this.user) {
      this.usertest = this.user;
      this.credentials.personPhoto = this.user?.photoUrl!;
      this.credentials.idSocialMedia = this.user?.id!;
      this.credentials.name = this.user?.name!;
      this.credentials.firstName = this.user?.firstName!;
      this.credentials.surname = this.user?.lastName!;
      this.credentials.token = this.user?.idToken!;
      this.authService.GetUser_allByID(this.user?.id!, this.credentials).subscribe((data) => {
        this.userCurrent = data;
        localStorage.setItem('Cur_user',JSON.stringify(this.userCurrent as JSON))
      });
    }
  }
}
