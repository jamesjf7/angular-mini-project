import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  of,
  from,
  switchMap,
  forkJoin,
  tap,
} from 'rxjs';
import { RepositoryService } from '../../services/repository.service';
import * as RepositoriesActions from './actions';

@Injectable()
export class RepositoriesEffects {
  constructor(
    private actions$: Actions,
    private repositoryService: RepositoryService
  ) {}
  getRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoriesActions.getRepositories),
      switchMap(() => {
        return this.repositoryService.getRepositories().pipe(
          map((repositories) =>
            RepositoriesActions.getRepositoriesSuccess({ repositories })
          ),
          catchError((error) =>
            of(
              RepositoriesActions.getRepositoriesFailure({
                error: error.message,
              })
            )
          )
        );
      }),
      mergeMap((repositories) => {
        return of(
          repositories,
          RepositoriesActions.getStarredRepositories(),
          RepositoriesActions.getSubscribedRepositories()
        );
      })
    )
  );

  // getRepositoriesSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RepositoriesActions.getRepositoriesSuccess),
  //     tap(() => {
  //       from([
  //         RepositoriesActions.getStarredRepositories(),
  //         RepositoriesActions.getSubscribedRepositories(),
  //       ]);
  //     })
  //   )
  // );

  getStarredRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoriesActions.getStarredRepositories),
      mergeMap(() => {
        return this.repositoryService.getStarredRepositories().pipe(
          map((starredRepositories) =>
            RepositoriesActions.getStarredRepositoriesSuccess({
              starredRepositories,
            })
          ),
          catchError((error) =>
            of(
              RepositoriesActions.getStarredRepositoriesFailure({
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
      ofType(RepositoriesActions.getSubscribedRepositories),
      mergeMap(() => {
        return this.repositoryService.getSubscribedRepositories().pipe(
          map((subscribedRepositories) =>
            RepositoriesActions.getSubscribedRepositoriesSuccess({
              subscribedRepositories,
            })
          ),
          catchError((error) =>
            of(
              RepositoriesActions.getSubscribedRepositoriesFailure({
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
      ofType(RepositoriesActions.getIssues),
      mergeMap((action) => {
        return this.repositoryService
          .getIssues(action.owner, action.repository_name)
          .pipe(
            map(
              (issues) => {
                return RepositoriesActions.getIssuesSuccess({
                  issues,
                });
              },
              catchError((error) =>
                of(
                  RepositoriesActions.getIssuesFailure({
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
      ofType(RepositoriesActions.starRepository),
      mergeMap((action) => {
        return this.repositoryService
          .starRepository(action.owner, action.repository_name)
          .pipe(
            mergeMap(() =>
              from([
                RepositoriesActions.getRepositories(),
                RepositoriesActions.getStarredRepositories(),
              ])
            )
          );
      })
    )
  );

  unstarRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoriesActions.unstarRepository),
      mergeMap((action) => {
        return this.repositoryService
          .unstarRepository(action.owner, action.repository_name)
          .pipe(
            mergeMap(() =>
              from([
                RepositoriesActions.getRepositories(),
                RepositoriesActions.getStarredRepositories(),
              ])
            )
          );
      })
    )
  );

  subscribeRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoriesActions.subscribeRepository),
      mergeMap((action) => {
        return this.repositoryService
          .subscribeRepository(action.owner, action.repository_name)
          .pipe(
            mergeMap(() =>
              from([
                RepositoriesActions.getRepositories(),
                RepositoriesActions.getSubscribedRepositories(),
              ])
            )
          );
      })
    )
  );

  unsubscribeRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoriesActions.unsubscribeRepository),
      mergeMap((action) => {
        return this.repositoryService
          .unsubscribeRepository(action.owner, action.repository_name)
          .pipe(
            mergeMap(() =>
              from([
                RepositoriesActions.getRepositories(),
                RepositoriesActions.getSubscribedRepositories(),
              ])
            )
          );
      })
    )
  );
}
