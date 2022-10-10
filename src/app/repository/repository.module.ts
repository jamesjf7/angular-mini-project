import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RepositoryService } from './shared/services/repository.service';
import { RepositoriesEffects } from './shared/store/effects';
import { reducers } from './shared/store/reducers';

import { RepositoryItemComponent } from './components/repository-item/repository-item.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { RepositoryDetailPageComponent } from './components/repository-detail-page/repository-detail-page.component';

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
    RepositoryDetailPageComponent,
    RepositoryItemComponent,
  ],
  exports: [
    RepositoryListComponent,
    RepositoryDetailPageComponent,
    RepositoryItemComponent,
  ],
})
export class RepositoryModule {}
