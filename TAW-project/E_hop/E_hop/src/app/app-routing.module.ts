import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./comonents/home/home.component";
import {MapComponent} from "./comonents/map/map.component";
import {RankingComponent} from "./comonents/ranking/ranking.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [


  {path: '',
    component: HomeComponent,
  },
  {path: 'ranking',
    component: RankingComponent,
  },
  {path: 'map-rankings',
    component: MapComponent,
  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
