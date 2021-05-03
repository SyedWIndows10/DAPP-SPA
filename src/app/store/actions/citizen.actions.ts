import { createAction, props } from '@ngrx/store';

export const createCitizen = createAction(
  '[Citizen] Create Citizen',
  props<{ citizen: any }>()
);

export const createCitizenSuccess = createAction(
  '[Citizen] Create Citizen Success',
  props<{ citizen: any }>()
);

export const createCitizenFailure = createAction(
  '[Citizen] Create Citizen Failure',
  props<{ citizen: any }>()
);

export const getCitizenById = createAction(
  '[Citizen] Get Citizen',
  props<{ id: any }>()
);

export const getCitizenByIdSuccess = createAction(
  '[Citizen] Get Citizen Success',
  props<{ citizen: any }>()
);

export const getCitizenByIdFailure = createAction(
  '[Citizen] Get Citizen Failure',
  props<{ error: any }>()
);

export const getCitizens = createAction(
  '[Citizen] Get Citizens'
);

export const getCitizensSuccess = createAction(
  '[Citizen] Get Citizens Success',
  props<{ citizens: any }>()
);

export const getCitizensFailure = createAction(
  '[Citizen] Get Citizens Failure',
  props<{ error: any }>()
);


export const getNoteByCitizenId = createAction(
  '[Citizen] Get Note By Citizen Id',
  props<{ id: any }>()
);

export const getNoteByCitizenIdSuccess = createAction(
  '[Citizen] Get Note By Citizen Id Success',
  props<{ citizen: any }>()
);

export const getNoteByCitizenIdFailure = createAction(
  '[Citizen] Get Note By Citizen Id Failure',
  props<{ error: any }>()
);
