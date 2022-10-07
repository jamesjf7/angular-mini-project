import {
  createAction,
  createSelector,
  createReducer,
  on,
  Store,
  props,
} from '@ngrx/store';

import { AppState } from 'src/app/shared/types/appState.model';
import { Repository } from '../types/repository.model';

const FEATURE_NAME = '[REPOSITORY]';

// ACTIONS
// get repositories
export const getRepositories = createAction(`${FEATURE_NAME} GET_REPOSITORIES`);
export const getRepositoriesSuccess = createAction(
  `${FEATURE_NAME} GET_REPOSITORIES_SUCCESS`,
  props<{ repositories: Repository[] }>()
);
export const getRepositoriesFailure = createAction(
  `${FEATURE_NAME} GET_REPOSITORIES_FAILURE`,
  props<{ error: string }>()
);

// get starred repositories
export const getStarredRepositories = createAction(
  `${FEATURE_NAME} GET_STARRED_REPOSITORIES`
);
export const getStarredRepositoriesSuccess = createAction(
  `${FEATURE_NAME} GET_STARRED_REPOSITORIES_SUCCESS`,
  props<{ starredRepositories: any[] }>()
);
export const getStarredRepositoriesFailure = createAction(
  `${FEATURE_NAME} GET_STARRED_REPOSITORIES_FAILURE`,
  props<{ error: string }>()
);

// get subscribed repositories
export const getSubscribedRepositories = createAction(
  `${FEATURE_NAME} GET_SUBSCRIBED_REPOSITORIE`
);
export const getSubscribedRepositoriesSuccess = createAction(
  `${FEATURE_NAME} GET_SUBSCRIBED_REPOSITORIES_SUCCESS`,
  props<{ subscribedRepositories: any[] }>()
);
export const getSubscribedRepositoriesFailure = createAction(
  `${FEATURE_NAME} GET_SUBSCRIBED_REPOSITORIES_FAILURE`,
  props<{ error: string }>()
);

// get issues
export const getIssues = createAction(
  `${FEATURE_NAME} GET_ISSUES`,
  props<{ owner: string; repository_name: string }>()
);
export const getIssuesSuccess = createAction(
  `${FEATURE_NAME} GET_ISSUES_SUCCESS`,
  props<{ issues: any[] }>()
);
export const getIssuesFailure = createAction(
  `${FEATURE_NAME} GET_ISSUES_FAILED`,
  props<{ error: string }>()
);

// unsubscribe repository
export const subscribeRepository = createAction(
  `${FEATURE_NAME} SUBSCRIBE_REPOSITORY`,
  props<{ owner: string; repository_name: string }>()
);
export const unsubscribeRepository = createAction(
  `${FEATURE_NAME} UNSUBSCRIBE_REPOSITORY`,
  props<{ owner: string; repository_name: string }>()
);

// start repository
export const starRepository = createAction(
  `${FEATURE_NAME} STAR_REPOSITORY`,
  props<{ owner: string; repository_name: string }>()
);

export const unstarRepository = createAction(
  `${FEATURE_NAME} UNSTAR_REPOSITORY`,
  props<{ owner: string; repository_name: string }>()
);

// REDUCERS
export interface RepositoriesStateInterface {
  repositories: Repository[];
  issues: any[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: RepositoriesStateInterface = {
  isLoading: false,
  error: null,
  repositories: [],
  issues: [],
};

export const reducers = createReducer(
  initialState,
  on(
    getRepositories,
    getStarredRepositories,
    getSubscribedRepositories,
    getIssues,
    (state) => ({
      ...state,
      isLoading: true,
    })
  ),
  on(getRepositoriesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    repositories: action.repositories,
  })),
  on(
    getRepositoriesFailure,
    getStarredRepositoriesFailure,
    getSubscribedRepositoriesFailure,
    getIssuesFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),

  on(getStarredRepositoriesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      repositories: state.repositories.map((repository) => {
        const isSstarred =
          action.starredRepositories.filter((repo) => repo.id === repository.id)
            .length > 0;
        return {
          ...repository,
          isSstarred,
        };
      }),
    };
  }),

  on(getSubscribedRepositoriesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      repositories: state.repositories.map((repository) => {
        const isSubscribed =
          action.subscribedRepositories.filter(
            (repo) => repo.id === repository.id
          ).length > 0;
        return {
          ...repository,
          isSubscribed,
        };
      }),
    };
  }),

  on(getIssuesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    issues: action.issues,
  }))
);

// SELECTOR
export const selectFeature = (state: AppState) => state.repositories;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const repositoriesSelector = createSelector(
  selectFeature,
  (state) => state.repositories
);

export const issuesSelector = createSelector(
  selectFeature,
  (state) => state.issues
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
