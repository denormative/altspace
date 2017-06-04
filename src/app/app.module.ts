import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PartyComponent } from './party/party.component';
import { CharacterComponent } from './character/character.component';
import { CombatComponent } from './combat/combat.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'party/all',  component: PartyComponent }, // partials/party/all.html
  { path: 'party/character/:id', component: CharacterComponent }, // partials/party/character.html
  // controller: function ($scope, $stateParams, $log) {
  //     //$log.info(JSON.stringify(game.party.characters));
  //     $scope.character = game.party ? game.party.characters[$stateParams.id] : null;
  // }
  { path: 'combat/fight',  component: CombatComponent }, // partials/combat/fight.html
  // CombatController
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PartyComponent,
    CharacterComponent,
    CombatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
