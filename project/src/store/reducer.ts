import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, CARDS_PER_STEP, DEFAULT_GENRE, FilmPageTabs} from '../const';
import {
  changeFilmTab,
  changeGenre,
  increaseCardCount,
  setAvatar,
  loadFilms,
  requireAuthorization,
  resetCardCount,
  resetFilmScreen,
  resetMainScreen,
  setDataLoadedStatus,
  setError,
  loadFilm,
  loadComments,
  loadSimilar,
  loadPromo,
  setFilmLoadedStatus,
  setFilmFoundStatus
} from './action';
import {filterFilmsByGenre} from '../utils/filter-films-by-genre';
import Films from '../types/films';
import {Comments} from '../types/comments';
import Similar from '../types/similar';
import Film from '../types/film';
import Promo from '../types/promo';

type InitialState = {
  films: Films;
  currentGenre: string,
  filteredFilms: Films,
  cardCount: number,
  authorizationStatus: string,
  isDataLoaded: boolean,
  filmPageTab: string,
  error: string | null,
  avatar: string | null,

  comments: Comments,
  similar: Similar,
  film: Film | null
  promo: Promo | null;


  isFilmFoundStatus: boolean | null,
  isFilmLoadedStatus: boolean | null
}

const initialState: InitialState = {
  films: [],
  promo: null,

  currentGenre: DEFAULT_GENRE,
  filteredFilms: [],
  cardCount: 0,

  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,

  filmPageTab: FilmPageTabs.Overview as string,

  error: null,
  avatar: null,

  comments: [],
  similar: [],
  film: null,

  isFilmFoundStatus: null,
  isFilmLoadedStatus: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetMainScreen, (state) => {
      state.currentGenre = DEFAULT_GENRE;
      state.filteredFilms = state.films;
      state.cardCount = state.films.length < CARDS_PER_STEP ? state.films.length : CARDS_PER_STEP;
    })
    .addCase(changeGenre, (state, action) => {
      const filteredFilms = filterFilmsByGenre(state.films, action.payload.currentGenre);

      state.currentGenre = action.payload.currentGenre;
      state.filteredFilms = filteredFilms;
      state.cardCount = filteredFilms.length < CARDS_PER_STEP ?
        filteredFilms.length :
        CARDS_PER_STEP;
    })

    .addCase(increaseCardCount, (state) => {
      state.cardCount = (state.cardCount + CARDS_PER_STEP) < state.filteredFilms.length ?
        state.cardCount + CARDS_PER_STEP :
        state.filteredFilms.length;
    })

    .addCase(resetCardCount, (state) => {
      state.cardCount = state.filteredFilms.length < CARDS_PER_STEP ?
        state.filteredFilms.length :
        8;
    })

    .addCase(resetFilmScreen, (state) => {
      state.filmPageTab = FilmPageTabs.Overview;
    })
    .addCase(changeFilmTab, (state, action) => {
      state.filmPageTab = action.payload.currentTab;
    })

    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.filteredFilms = action.payload;
      state.cardCount = CARDS_PER_STEP;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })

    .addCase(setAvatar, (state, action) => {
      state.avatar = action.payload;
    })

    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadSimilar, (state, action) => {
      state.similar = action.payload;
    })

    .addCase(setFilmLoadedStatus, (state, action) => {
      state.isFilmLoadedStatus = action.payload;
    })
    .addCase(setFilmFoundStatus, (state, action) => {
      state.isFilmFoundStatus = action.payload;
    });
});
