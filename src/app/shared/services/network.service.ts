import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  access_token = environment.access_token;
  options = {
    headers: {
      Authorization: `Bearer ${this.access_token}`,
    },
  };
  constructor(protected http: HttpClient) {}

  getRequest(url: string, options?: object) {
    return this.http.get<any>(url, {
      ...this.options,
      ...(options || {}),
    });
  }

  putRequest(url: string, body?: object, options?: object) {
    return this.http.put<any>(url, body, {
      ...this.options,
      ...(body || {}),
      ...(options || {}),
    });
  }

  deleteRequest(url: string, options?: object) {
    return this.http.delete<any>(url, {
      ...this.options,
      ...(options || {}),
    });
  }
}
