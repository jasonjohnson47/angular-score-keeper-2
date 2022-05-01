import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { NativeElementInjectorDirective } from './native-element-injector.directive';
import { CurrentRoundComponent } from './current-round/current-round.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditRoundComponent } from './edit-round/edit-round.component';
import { FloatingLabelInputComponent } from './floating-label-input/floating-label-input.component';
import { AddSubToggleComponent } from './add-sub-toggle/add-sub-toggle.component';
import { FloatingLabelInputDirective } from './floating-label-input.directive';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    GameSetupComponent,
    NativeElementInjectorDirective,
    CurrentRoundComponent,
    GameHistoryComponent,
    PageNotFoundComponent,
    EditRoundComponent,
    FloatingLabelInputComponent,
    AddSubToggleComponent,
    FloatingLabelInputDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
