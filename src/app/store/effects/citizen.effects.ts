import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { ContractService} from 'src/app/_services/contract.service'

import * as CitizenActions from '../actions/citizen.actions';


@Injectable()
export class CitizenEffects {

  createCitizen$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(CitizenActions.createCitizen),
      switchMap( async (value: any) => {
        console.log(value);
     return await this.contractService.addCitizen(
        value.citizen.username,
        value.citizen.age,
        value.citizen.city,
        value.citizen.notes);
      }),
      map((response: any) => CitizenActions.createCitizenSuccess({citizen: response}))
    )
  )

  getCitizenById$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(CitizenActions.getCitizenById),
      switchMap( async (value: any) => await this.contractService.getCitizenById(value.id),
      ),
      map((response: any) => CitizenActions.getCitizenByIdSuccess({citizen: response}))
    )
   )

   getCitizens$ = createEffect((): Observable<any> =>
   this.actions$.pipe(
     ofType(CitizenActions.getCitizens),
     switchMap( async (value: any) => {
       console.log(value)
    return await this.contractService.getCitizens();
     }),
     map((response: any) => CitizenActions.getCitizensSuccess({citizens: response}))
   )
  )


  getNoteByCitizenId$ = createEffect((): Observable<any> =>
  this.actions$.pipe(
    ofType(CitizenActions.getNoteByCitizenId),
    switchMap( async (value: any) => await this.contractService.getNoteByCitizenId(value.id),
    )
    //map((response: any) => CitizenActions.getNoteByCitizenIdSuccess({citizen: response}))
  )
 )


  constructor(
    private actions$: Actions,
    private contractService: ContractService,
    ) {}

}
