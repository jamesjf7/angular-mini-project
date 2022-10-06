import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.repositories;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const repositoriesSelector = createSelector(
  selectFeature,
  (state) => state.repositories
);

export const starredRepositoriesSelector = createSelector(
  selectFeature,
  (state) => state.starredRepositories
);

export const subscribedRepositoriesSelector = createSelector(
  selectFeature,
  (state) => state.subscribedRepositories
);

export const issuesSelector = createSelector(
  selectFeature,
  (state) => state.issues
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
