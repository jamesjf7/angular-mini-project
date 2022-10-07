import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from 'src/app/shared/services/network.service';
import { environment } from 'src/environments/environment';

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

  starRepository(owner: string, repository_name: string): Observable<any> {
    return this.putRequest(
      `${this.baseUrl}/user/starred/${owner}/${repository_name}`
    );
  }

  unstarRepository(owner: string, repository_name: string): Observable<any> {
    const url = `https://api.github.com/user/starred/${owner}/${repository_name}`;
    return this.deleteRequest(
      `${this.baseUrl}/user/starred/${owner}/${repository_name}`
    );
  }

  subscribeRepository(owner: string, repository_name: string): Observable<any> {
    return this.putRequest(
      `${this.baseUrl}/repos/${owner}/${repository_name}/subscription`,
      {
        ignored: false,
        subscribed: true,
      }
    );
  }

  unsubscribeRepository(
    owner: string,
    repository_name: string
  ): Observable<any> {
    return this.deleteRequest(
      `${this.baseUrl}/repos/${owner}/${repository_name}/subscription`
    );
  }
}
