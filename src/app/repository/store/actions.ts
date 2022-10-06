import { createAction, props } from '@ngrx/store';
import { RepositoryInterface } from '../types/repository.interface';

// get repositories
export const getRepositories = createAction('[Repository] Get Repositories');
export const getRepositoriesSuccess = createAction(
  '[Repository] Get Repositories Success',
  props<{ repositories: RepositoryInterface[] }>()
);
export const getRepositoriesFailure = createAction(
  '[Repository] Get Repositories Failure',
  props<{ error: string }>()
);

// get starred repositories
export const getStarredRepositories = createAction(
  '[Repository] Get Starred Repositories'
);
export const getStarredRepositoriesSuccess = createAction(
  '[Repository] Get Starred Repositories Success',
  props<{ starredRepositories: any[] }>()
);
export const getStarredRepositoriesFailure = createAction(
  '[Repository] Get Starred Repositories Failure',
  props<{ error: string }>()
);

// get subscribed repositories
export const getSubscribedRepositories = createAction(
  '[Repository] Get Subscribed Repositories'
);
export const getSubscribedRepositoriesSuccess = createAction(
  '[Repository] Get Subscribed Repositories Success',
  props<{ subscribedRepositories: any[] }>()
);
export const getSubscribedRepositoriesFailure = createAction(
  '[Repository] Get Subscribed Repositories Failure',
  props<{ error: string }>()
);

// get issues
export const getIssues = createAction(
  '[Repository] Get Issues',
  props<{ owner: string; repository_name: string }>()
);
export const getIssuesSuccess = createAction(
  '[Repository] Get Issues Success',
  props<{ issues: any[] }>()
);
export const getIssuesFailure = createAction(
  '[Repository] Get Issues Failed',
  props<{ error: string }>()
);

// unsubscribe repository
export const subscribeRepository = createAction(
  '[Repostitory] Subscribe Repository',
  props<{ owner: string; repository_name: string }>()
);
export const unsubscribeRepository = createAction(
  '[Repostitory] Unsubscribe Repository',
  props<{ owner: string; repository_name: string }>()
);

// start repository
export const starRepository = createAction(
  '[Repostitory] Star Repository',
  props<{ owner: string; repository_name: string }>()
);

export const unstarRepository = createAction(
  '[Repostitory] Unstar Repository',
  props<{ owner: string; repository_name: string }>()
);
