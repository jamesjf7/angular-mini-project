import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, from, switchMap, forkJoin } from 'rxjs';
import { RepositoryService } from '../services/repository.service';
import { Repository } from '../types/repository.model';
import {
  getRepositories,
  getRepositoriesSuccess,
  getRepositoriesFailure,
  getStarredRepositories,
  getSubscribedRepositories,
  getStarredRepositoriesSuccess,
  getStarredRepositoriesFailure,
  getIssues,
  getIssuesSuccess,
  getIssuesFailure,
  starRepository,
  unstarRepository,
  subscribeRepository,
  unsubscribeRepository,
  getSubscribedRepositoriesFailure,
  getSubscribedRepositoriesSuccess,
} from './reducers';

@Injectable()
export class RepositoriesEffects {
  constructor(
    private actions$: Actions,
    private repositoryService: RepositoryService
  ) {}
  getRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRepositories),
      switchMap(() => {
        return forkJoin([
          this.repositoryService.getRepositories(),
          this.repositoryService.getStarredRepositories(),
          this.repositoryService.getSubscribedRepositories(),
        ]).pipe(
          map(([repositories, starredRepositories, subscribedRepositories]) => {
            repositories = repositories.map((repository: Repository) => {
              return {
                ...repository,
                isStarred:
                  starredRepositories.filter(
                    (starredRepository: Repository) =>
                      starredRepository.id === repository.id
                  ).length > 0,
                isSubscribed:
                  subscribedRepositories.filter(
                    (subscribedRepository: Repository) =>
                      subscribedRepository.id === repository.id
                  ).length > 0,
              };
            });
            return getRepositoriesSuccess({
              repositories: repositories,
            });
          }),
          catchError((error) =>
            of(
              getRepositoriesFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  getStarredRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStarredRepositories),
      mergeMap(() => {
        return this.repositoryService.getStarredRepositories().pipe(
          map((starredRepositories) =>
            getStarredRepositoriesSuccess({
              starredRepositories,
            })
          ),
          catchError((error) =>
            of(
              getStarredRepositoriesFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  getSubscribedRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSubscribedRepositories),
      mergeMap(() => {
        return this.repositoryService.getSubscribedRepositories().pipe(
          map((subscribedRepositories) =>
            getSubscribedRepositoriesSuccess({
              subscribedRepositories,
            })
          ),
          catchError((error) =>
            of(
              getSubscribedRepositoriesFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  getIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getIssues),
      mergeMap((action) => {
        return this.repositoryService
          .getIssues(action.owner, action.repository_name)
          .pipe(
            map(
              (issues) => {
                return getIssuesSuccess({
                  issues,
                });
              },
              catchError((error) =>
                of(
                  getIssuesFailure({
                    error: error.message,
                  })
                )
              )
            )
          );
      })
    )
  );

  starRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(starRepository),
      mergeMap((action) => {
        return this.repositoryService
          .starRepository(action.owner, action.repository_name)
          .pipe(
            mergeMap(() => from([getRepositories(), getStarredRepositories()]))
          );
      })
    )
  );

  unstarRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unstarRepository),
      mergeMap((action) => {
        return this.repositoryService
          .unstarRepository(action.owner, action.repository_name)
          .pipe(
            mergeMap(() => from([getRepositories(), getStarredRepositories()]))
          );
      })
    )
  );

  subscribeRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subscribeRepository),
      mergeMap((action) => {
        return this.repositoryService
          .subscribeRepository(action.owner, action.repository_name)
          .pipe(
            mergeMap(() =>
              from([getRepositories(), getSubscribedRepositories()])
            )
          );
      })
    )
  );

  unsubscribeRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unsubscribeRepository),
      mergeMap((action) => {
        return this.repositoryService
          .unsubscribeRepository(action.owner, action.repository_name)
          .pipe(
            mergeMap(() =>
              from([getRepositories(), getSubscribedRepositories()])
            )
          );
      })
    )
  );
}
