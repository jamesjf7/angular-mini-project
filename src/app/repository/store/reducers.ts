import { map } from 'rxjs/operators';
import { createReducer, on, Store } from '@ngrx/store';
import { RepositoriesStateInterface } from '../types/repositoriesState.interface';
import * as RepositoriesActions from './actions';
import { state } from '@angular/animations';
import { repositoriesSelector } from './selectors';

export const initialState: RepositoriesStateInterface = {
  isLoading: false,
  error: null,
  repositories: [],
  starredRepositories: [],
  subscribedRepositories: [],
  issues: [],
};

export const reducers = createReducer(
  initialState,
  // repositories
  on(RepositoriesActions.getRepositories, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(RepositoriesActions.getRepositoriesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    repositories: action.repositories,
  })),
  on(RepositoriesActions.getRepositoriesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // starred repositories
  on(RepositoriesActions.getStarredRepositories, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(RepositoriesActions.getStarredRepositoriesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      repositories: state.repositories.map((repository) => {
        const is_starred =
          action.starredRepositories.filter((repo) => repo.id === repository.id)
            .length > 0;
        return {
          ...repository,
          is_starred,
        };
      }),
    };
  }),
  on(RepositoriesActions.getStarredRepositoriesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // subscribed repositories
  on(RepositoriesActions.getSubscribedRepositories, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(RepositoriesActions.getSubscribedRepositoriesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      repositories: state.repositories.map((repository) => {
        const is_subscribed =
          action.subscribedRepositories.filter(
            (repo) => repo.id === repository.id
          ).length > 0;
        return {
          ...repository,
          is_subscribed,
        };
      }),
    };
  }),
  on(RepositoriesActions.getSubscribedRepositoriesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // get issues
  on(RepositoriesActions.getIssues, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(RepositoriesActions.getIssuesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    issues: action.issues,
  })),
  on(RepositoriesActions.getIssuesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // star & unstar
  on(RepositoriesActions.starRepository, (state, action) => {
    return {
      ...state,
    };
  }),
  on(RepositoriesActions.unstarRepository, (state, action) => {
    return {
      ...state,
    };
  }),

  // subscribe
  on(RepositoriesActions.subscribeRepository, (state, action) => {
    return {
      ...state,
    };
  }),
  on(RepositoriesActions.unsubscribeRepository, (state, action) => {
    return {
      ...state,
    };
  })
);
