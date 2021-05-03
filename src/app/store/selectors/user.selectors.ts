import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from 'src/app/store/reducers/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUserAccountId = createSelector(
  selectUserState,
  fromUser.userAccountId
)

export const selectConnectionStatus = createSelector(
  selectUserState,
  fromUser.connectionStatus
)
