import { map } from 'rxjs/operators';
import { createReducer, on, Store } from '@ngrx/store';
import { RepositoriesStateInterface } from '../types/repositoriesState.interface';
import * as RepositoriesActions from './actions';
import { state } from '@angular/animations';

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
  on(RepositoriesActions.getStarredRepositoriesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    starredRepositories: action.starredRepositories,
  })),
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
  on(RepositoriesActions.getSubscribedRepositoriesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    subscribedRepositories: action.subscribedRepositories,
  })),
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
      repositories: state.repositories.map((repo) => {
        return {
          ...repo,
          stargazers_count:
            repo.name === action.repository_name
              ? repo.stargazers_count + 1
              : repo.stargazers_count,
        };
      }),
    };
  }),
  on(RepositoriesActions.unstarRepository, (state, action) => {
    return {
      ...state,
      repositories: state.repositories.map((repo) => {
        return {
          ...repo,
          stargazers_count:
            repo.name === action.repository_name
              ? repo.stargazers_count - 1
              : repo.stargazers_count,
        };
      }),
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
