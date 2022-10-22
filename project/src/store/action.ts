import {createAction} from '@reduxjs/toolkit';
import Films from '../types/films';
import {AppRoute, AuthorizationStatus} from '../const';

const resetMainScreen = createAction('main/resetState');
const changeGenre = createAction<{ currentGenre: string }>('main/changeGenre');

const increaseCardCount = createAction('main/increaseCardCount');
const resetCardCount = createAction('main/resetCardCount');

const resetFilmScreen = createAction('film/resetState');
const changeFilmTab = createAction<{ currentTab: string }>('film/changeFilmTab');

const loadFilms = createAction<Films>('data/loadFilms');
const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

const setAvatar = createAction<string | null>('user/avatar');

const setError = createAction<string | null>('app/setError');

const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export {
  resetMainScreen,
  changeGenre,
  increaseCardCount,
  resetCardCount,
  resetFilmScreen,
  changeFilmTab,
  loadFilms,
  setDataLoadedStatus,
  requireAuthorization,
  setError,
  redirectToRoute,
  setAvatar
};
