import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NativeElementInjectorDirective } from './native-element-injector.directive';
import { CurrentRoundComponent } from './current-round/current-round.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditRoundComponent } from './edit-round/edit-round.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    GameSetupComponent,
    NativeElementInjectorDirective,
    CurrentRoundComponent,
    GameHistoryComponent,
    PageNotFoundComponent,
    EditRoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
