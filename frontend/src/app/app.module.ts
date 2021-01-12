import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);

import { HeaderComponent } from './pages/struct/header/header.component';
import { FooterComponent } from './pages/struct/footer/footer.component';
import { AboutComponent } from './pages/struct/about/about.component';
import { ContactComponent } from './pages/struct/contact/contact.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { DataSharingService } from './services/data-sharing.service';

// User components
import { UserComponent } from './pages/user/user.component';
import { SignUpComponent } from './pages/user/sign-up/sign-up.component';
import { SignInComponent } from './pages/user/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    SignInComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, {
    provide: LOCALE_ID,
    useValue: 'it-IT'
  }, AuthGuard, UserService, DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
