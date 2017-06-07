import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PartyComponent } from './party/party.component';
import { CharacterComponent } from './character/character.component';
import { CombatComponent } from './combat/combat.component';
import { NiceNumberPipe } from './nice-number.pipe';
import { GameService } from './game.service';
import { SpadPipe } from './spad.pipe';
import { ToClassPipe } from './to-class.pipe';
import { CharacterDropdownComponent } from './character-dropdown.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'party/all',  component: PartyComponent }, // partials/party/all.html
  { path: 'party/character/:id', component: CharacterComponent }, // partials/party/character.html
  { path: 'combat/fight',  component: CombatComponent }, // partials/combat/fight.html
  // CombatController
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PartyComponent,
    CharacterComponent,
    CombatComponent,
    NiceNumberPipe,
    SpadPipe,
    ToClassPipe,
    CharacterDropdownComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
