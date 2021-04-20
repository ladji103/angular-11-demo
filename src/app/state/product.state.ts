export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  dataState?: DataStateEnum;
  data?: T;
  error?: string;
}

export enum EventActionTypes {
  GET_ALL_PRODUCTS = '[Product] GET ALL PRODUCTS',
  GET_SELECTED_PRODUCTS = '[Product] GET SELECTED PRODUCTS',
  GET_AVAILABLE_PRODUCTS = '[Product] GET AVAILABLE PRODUCTS',
  SEARCH_PRODUCTS = '[Product] SEARCH PRODUCTS',
  NEW_PRODUCT = '[Product] NEW PRODUCTS',
  SELECT_PRODUCT = '[Product] SELECT PRODUCTS',
  DELETE_PRODUCT = '[Product] DELETE PRODUCTS',
  EDIT_PRODUCT = '[Product] EDIT PRODUCTS',
}

export interface ActionEvent {
  type: EventActionTypes;
  payload?: any;
}
