import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './store/reducers/user.reducer';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { UserEffects } from './store/effects/user.effects';
import * as fromCitizen from './store/reducers/citizen.reducer';
import { CitizenEffects } from './store/effects/citizen.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { NavComponent } from './nav/nav.component';
import { ConnectComponent } from './connect/connect.component';
import { CreateCitizenComponent } from './create-citizen/create-citizen.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
  //  JwPaginationComponent,
    HomeComponent,
    ListsComponent,
    NavComponent,
    ConnectComponent,
    CreateCitizenComponent

    //PagingComponent
  ],
  imports: [
    BrowserModule,
    //JwPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgxPaginationModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects, CitizenEffects]),
    StoreModule.forFeature(fromCitizen.citizenFeatureKey, fromCitizen.reducer),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
