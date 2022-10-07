import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as REPOSITORY from '../../shared/store/reducers';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'repository-item',
  templateUrl: 'repository-item.component.html',
})
export class RepositoryItemComponent implements OnInit {
  @Input() repository: any;
  @Output() onStarred: EventEmitter<any> = new EventEmitter();
  @Output() onSubscribed: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {}

  handleOnStarred() {
    this.onStarred.emit(this.repository);
  }

  handleOnSubscribed() {
    this.onSubscribed.emit(this.repository);
  }
}
