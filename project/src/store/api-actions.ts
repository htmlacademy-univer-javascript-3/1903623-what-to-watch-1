import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import Films from '../types/films';
import {APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {
  setAvatar,
  loadFilms,
  redirectToRoute,
  requireAuthorization,
  setDataLoadedStatus,
  setError,
  loadComments,
  loadFilm,
  loadSimilar
} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import {store} from './index';
import Similar from '../types/similar';
import Film from '../types/film';
import {Comments} from '../types/comments';
import {UserComment} from '../types/user-comment';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadFilms(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAvatar(avatarUrl));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setAvatar(null));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const fetchFilmByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    dispatch(loadFilm(data));
  },
);

export const fetchCommentsByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCommentsById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${filmId}`);
    dispatch(loadComments(data));
  },
);

export const fetchSimilarByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Similar>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`);
    dispatch(loadSimilar(data));
  },
);

export const postComment = createAsyncThunk<void, UserComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCommentById',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(true));
    await api.post<UserComment>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${APIRoute.Films}/${filmId}`));
    dispatch(setDataLoadedStatus(false));
  },
);
