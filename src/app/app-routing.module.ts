import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { CurrentRoundComponent } from './current-round/current-round.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { EditRoundComponent } from './edit-round/edit-round.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'game-setup', component: GameSetupComponent },
  { path: 'current-round', component: CurrentRoundComponent },
  { path: 'game-history', component: GameHistoryComponent },
  { path: 'edit-round/:round', component: EditRoundComponent },
  { path: '', redirectTo: '/game-setup', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },// Wildcard for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
