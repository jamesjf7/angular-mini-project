import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as REPOSITORY from '../../shared/store/reducers';
import { AppState } from 'src/app/shared/types/appState.model';

@Component({
  selector: 'repository-item',
  templateUrl: 'repository-item.component.html',
})
export class RepositoryItemComponent implements OnInit {
  @Input() repository: any;
  @Output() onStarred: EventEmitter<any> = new EventEmitter();
  @Output() onSubscribed: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  handleOnStarred() {
    this.onStarred.emit(this.repository);
  }

  handleOnSubscribed() {
    this.onSubscribed.emit(this.repository);
  }
}
