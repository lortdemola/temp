import {Component, OnInit} from '@angular/core';
import {
  GoogleLoginProvider,

  SocialAuthService,
  SocialUser
} from "@abacritt/angularx-social-login";
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  userRanking: any;
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
  public credentialsRank = {
    idSocialMedia:  '',
    fullname:  '',
    score: 0,


  };

  GoogleLoginProvider = GoogleLoginProvider;

  constructor(private authService: AuthService,private dataService: DataService,private readonly _authService: SocialAuthService) {}

  ngOnInit() {
    this.userRanking = null;
    this._authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signOut(): void {
    this._authService.signOut();
  }
  async signin(): Promise<void> {
    if (this.usertest != this.user) {
      this.usertest = this.user;
      this.credentials.personPhoto = this.user?.photoUrl!;
      this.credentials.idSocialMedia = this.user?.id!;
      this.credentials.name = this.user?.name!;
      this.credentials.firstName = this.user?.firstName!;
      this.credentials.surname = this.user?.lastName!;
      this.credentials.token = this.user?.idToken!;
      this.authService.createOrUpdate(this.credentials).subscribe((result) => {
        return result;
      });
      await this.dataService.getById(this.credentials).subscribe((result) => {
        this.userRanking = result as JSON;

        return result;
      });
        delay(2000);
        this.userCurrent = localStorage.getItem('Cur_user');

    }

  }
  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(this.GoogleLoginProvider.PROVIDER_ID);
  }

  Add() {
    this.credentialsRank.idSocialMedia= this.user?.id!;
    this.credentialsRank.fullname= this.user?.name!;
    this.credentialsRank.score = 20;
    console.log(this.credentialsRank);
    this.dataService.addRanking(this.credentialsRank).subscribe((result) => {
      return result;
    });
  }
}
//usuwanie userów i usuwanie rank
