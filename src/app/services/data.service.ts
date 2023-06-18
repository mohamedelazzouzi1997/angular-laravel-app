import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book } from 'src/app/Model/book'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  getBooks() {
    return this.httpClient.get('http://127.0.0.1:8000/api/books');
  }

  addBook(book:Book){
    return this.httpClient.post('http://127.0.0.1:8000/api/books',book);
  }

  deleteBook(id:string){
     return this.httpClient.delete('http://127.0.0.1:8000/api/book/delete/'+id);
  }
}
