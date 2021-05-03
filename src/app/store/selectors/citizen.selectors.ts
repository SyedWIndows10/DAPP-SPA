import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCitizen from '../reducers/citizen.reducer';

export const selectCitizenState = createFeatureSelector<fromCitizen.State>(
  fromCitizen.citizenFeatureKey
);

export const selectCitizenDetails = createSelector(
  selectCitizenState,
  fromCitizen.myCitizen
);

export const selectCitizensList = createSelector(
  selectCitizenState,
  fromCitizen.Citizens
);
