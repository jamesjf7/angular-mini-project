import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RepositoryService } from '../services/repository.service';
import { RepositoriesEffects } from './store/effects';
import { reducers } from './store/reducers';

import { RepositoryItemComponent } from './components/repository-item/repository-item.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { RepositoryDetailComponent } from './components/repository-detail/repository-detail.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    StoreModule.forFeature('repositories', reducers),
    EffectsModule.forFeature([RepositoriesEffects]),
  ],
  providers: [RepositoryService],
  declarations: [
    RepositoryListComponent,
    RepositoryDetailComponent,
    RepositoryItemComponent,
  ],
  exports: [
    RepositoryListComponent,
    RepositoryDetailComponent,
    RepositoryItemComponent,
  ],
})
export class RepositoryModule {}
