import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { VendeurSubscribeComponent } from './components/auth/vendeur-subscribe/vendeur-subscribe.component';
import { AcheteurSubscribeComponent } from './components/auth/acheteur-subscribe/acheteur-subscribe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CommonModule } from '@angular/common';
// import DataTables from 'datatables.net';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VendeurSubscribeComponent,
    AcheteurSubscribeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    // DataTables
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
