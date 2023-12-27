import { NgModule } from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataService} from "./services/data.service";

import {FormsModule} from "@angular/forms";

import { HomeComponent } from './comonents/home/home.component';
import {MapComponent} from "./comonents/map/map.component";
import {RankingComponent} from "./comonents/ranking/ranking.component";
import {AuthService} from "./services/auth.service";
import {AuthInterceptor} from
    './services/auth/auth.interceptor';

import { NavbarComponent } from './components/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {OrderByPipe} from "./order-by.pipe";
import {GoogleMapsModule} from "@angular/google-maps";

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
    HomeComponent,
    RankingComponent,
    MapComponent,
    NavbarComponent,

    FooterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    GoogleSigninButtonModule,
    GoogleMapsModule,



  ],
  providers: [
    provideClientHydration(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('964979770752-edlm80vbk22uv27or4h90npi5hu6q3fc.apps.googleusercontent.com')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
