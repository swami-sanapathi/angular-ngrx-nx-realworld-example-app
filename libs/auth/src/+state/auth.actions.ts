import { User } from './auth.interfaces';

export interface GetUser {
	type: '[auth] GET_USER';
}

export interface SetUser {
	type: '[auth] SET_USER';
	payload: User;
}

export interface Login {
	type: '[auth] LOGIN';
}

export interface LoginSuccess {
	type: '[auth] LOGIN_SUCCESS';
}

export interface LoginFail {
	type: '[auth] LOGIN_FAIL';
}

export interface Register {
	type: '[auth] REGISTER';
}

export interface RegisterSuccess {
	type: '[auth] REGISTER_SUCCESS';
}

export interface RegisterFail {
	type: '[auth] REGISTER_FAIL';
}

export interface SetLocalStorage {
	type: '[auth] SET_LOCAL_STORAGE';
	payload: string
}

export type AuthAction =
	| GetUser
	| SetUser
	| Login
	| LoginSuccess
	| LoginFail
	| Register
	| RegisterSuccess
	| RegisterFail
	| SetLocalStorage;
