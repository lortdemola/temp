import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = "http://localhost:3000";

    constructor(private http: HttpClient) {
}

  getAllRankings() {
  return this.http.get(this.url + '/api/rankings');

}
  getById(credentials:any) {
    return this.http.put(this.url + '/api/MyRankings/' , credentials);
  }
  DeleteRanking(id: string) {
    return this.http.delete(this.url + '/api/rankings/' + id);
  }
  Update(id: string,credentials: any){
    return this.http.put(this.url + '/api/product/'+ id , credentials);
  }
  ResetAll(id: string){
    return this.http.put(this.url + '/api/Reset/',id);
  }
  addRanking(credentials: any) {
    console.log(credentials)
    return this.http.post(this.url + '/api/rankings', credentials);
  }
}
