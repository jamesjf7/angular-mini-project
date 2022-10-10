import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from 'src/app/shared/services/network.service';
import { environment } from 'src/environments/environment';
import { Repository } from '../types/repository.model';

@Injectable({ providedIn: 'root' })
export class RepositoryService extends NetworkService {
  baseUrl = 'https://api.github.com';
  constructor(http: HttpClient) {
    super(http);
  }

  getRepositories(): Observable<any> {
    return this.getRequest(`${this.baseUrl}/user/repos`);
  }

  getStarredRepositories(): Observable<any> {
    return this.getRequest(`${this.baseUrl}/user/starred`);
  }

  getSubscribedRepositories(): Observable<any> {
    return this.getRequest(`${this.baseUrl}/user/subscriptions`);
  }

  getIssues(owner: string, repository_name: string): Observable<any> {
    return this.getRequest(
      `${this.baseUrl}/repos/${owner}/${repository_name}/issues`
    );
  }

  starRepository(repository: Repository): Observable<any> {
    const { owner, name } = repository;
    return this.putRequest(
      `${this.baseUrl}/user/starred/${owner.login}/${name}`
    );
  }

  unstarRepository(repository: Repository): Observable<any> {
    const { owner, name } = repository;
    return this.deleteRequest(
      `${this.baseUrl}/user/starred/${owner.login}/${name}`
    );
  }

  subscribeRepository(repository: Repository): Observable<any> {
    const { owner, name } = repository;
    return this.putRequest(
      `${this.baseUrl}/repos/${owner.login}/${name}/subscription`,
      {
        ignored: false,
        subscribed: true,
      }
    );
  }

  unsubscribeRepository(repository: Repository): Observable<any> {
    const { owner, name } = repository;
    return this.deleteRequest(
      `${this.baseUrl}/repos/${owner.login}/${name}/subscription`
    );
  }
}
