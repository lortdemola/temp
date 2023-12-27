import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {delay} from "rxjs";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent  implements OnInit  {
  data:any;
  dataRaw:any;
  userCurrent:any;
  user: SocialUser| undefined;
  constructor(private authService: AuthService,private dataService: DataService,private readonly _authService: SocialAuthService) {}
  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
      delay(2000);
      this.userCurrent = JSON.parse(localStorage.getItem('Cur_user'));
    });
    this.dataService.getAllRankings().subscribe((data) => {
      this.data = data as JSON;
      this.dataRaw = data;
    });

  }

    deleteUser(id){
      this.authService.GetUserByID(id,this.dataRaw[0]).subscribe((data) => {

      if(data.toString() == "false"){

      }else {
        this.authService.deleteUser(data.toString()).subscribe((data) => {});
        this.dataService.DeleteRanking(id.toString()).subscribe((data) => {});
        if(this.user.id == this.userCurrent.idSocialMedia){
          this._authService.signOut();
          localStorage.removeItem('Cur_user');
        }
        //this._authService.signOut();

      }});
      this.dataService.getAllRankings().subscribe((data) => {

        this.data = data as JSON;
        this.dataRaw = data;
      });

    }
  reset() {

    this.dataService.ResetAll("sx").subscribe((data) => {

      this.data = data as JSON;

    });
  }
}
