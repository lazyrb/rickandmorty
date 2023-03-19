import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './components/characterDetails/character.details.component';
import { SearchComponent } from './components/search/search.component';
import { SignInComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [		
    AppComponent,
    SearchComponent,
    CharacterComponent,
    SignInComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
