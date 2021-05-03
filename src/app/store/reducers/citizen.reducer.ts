import { Action, createReducer, on } from '@ngrx/store';
import * as CitizenActions from '../actions/citizen.actions';

export const citizenFeatureKey = 'citizen';

export interface State {
  myCitizen: {};
  newCitizen: {};
  citizens:[];
}

export const initialState: State = {
  myCitizen: {},
  citizens:[],
  newCitizen: {}
};


export const reducer = createReducer(
  initialState,

  on(CitizenActions.createCitizen, state => state),

  on(CitizenActions.createCitizenSuccess, (state, { citizen }) => (
    {
      ...state,
      newCitizen: citizen
    }
  )),

  on(CitizenActions.createCitizenFailure, (state, action) => state),

  on(
    CitizenActions.getCitizens, state => state),

  on(CitizenActions.getCitizensSuccess, (state, { citizens }) => (
    {
      ...state,
      citizens: citizens
    }
  ))
);

export const myCitizen = (state: State) => state.newCitizen

export const Citizens = (state: State) => state.citizens
