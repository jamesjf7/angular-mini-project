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
            return getRepositoriesSuccess({
              repositories: repositories.map((repository: Repository) => {
                return Object.assign(new Repository(), repository, {
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
                });
              }),
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
          .starRepository(action.repository)
          .pipe(mergeMap(() => from([getRepositories()])));
      })
    )
  );

  unstarRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unstarRepository),
      mergeMap((action) => {
        return this.repositoryService
          .unstarRepository(action.repository)
          .pipe(mergeMap(() => from([getRepositories()])));
      })
    )
  );

  subscribeRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subscribeRepository),
      mergeMap((action) => {
        return this.repositoryService
          .subscribeRepository(action.repository)
          .pipe(mergeMap(() => from([getRepositories()])));
      })
    )
  );

  unsubscribeRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unsubscribeRepository),
      mergeMap((action) => {
        return this.repositoryService
          .unsubscribeRepository(action.repository)
          .pipe(mergeMap(() => from([getRepositories()])));
      })
    )
  );
}
