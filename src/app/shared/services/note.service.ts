import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MyNote } from '../interfaces/note.interface';
import { TypeNote } from '../interfaces/type.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNotes(): Promise<any> {
    return this.http.get(`${environment.routeApi}/notes`).toPromise();
  }

  getNote(id: number): Promise<any> {
    return this.http.get(`${environment.routeApi}/notes/${id}`).toPromise();
  }

  postNote(data: MyNote): Promise<any> {
    return this.http.post(`${environment.routeApi}/notes`, data).toPromise();
  }

  deleteNote(id: number): Promise<any> {
    return this.http.delete( `${environment.routeApi}/notes/${id}`).toPromise();
  }

  putNote(id: number, data: MyNote): Promise<any> {
    return this.http.put( `${environment.routeApi}/notes/${id}`, data).toPromise();
  }

  getTypes(): Promise<any> {
    return this.http.get(`${environment.routeApi}/types`).toPromise();
  }

  getType(id: number): Promise<any> {
    return this.http.get(`${environment.routeApi}/types/${id}`).toPromise();
  }

  postType(data: TypeNote): Promise<any> {
    return this.http.post(`${environment.routeApi}/types`, data).toPromise();
  }

  deleteType(id: number): Promise<any> {
    return this.http.delete( `${environment.routeApi}/types/${id}`).toPromise();
  }

  putType(id: number, data: MyNote): Promise<any> {
    return this.http.put( `${environment.routeApi}/types/${id}`, data).toPromise();
  }
}
