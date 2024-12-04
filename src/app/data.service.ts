// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

  // constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { of } from 'rxjs';
// import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { User } from './us'
// Define the User type if not already defined
type User = { [key: string]: string | undefined };


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3030';
  private apiUrl2 = 'http://20.212.171.246:2972';
  private apiUrl3 = 'http://localhost:2972';


  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userss`);
  }
  getUsers2(): Observable<any> {
    return this.http.get(`${this.apiUrl2}/data/getColumnNameCustomers`);
  }
  getUsers1(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userssProd`);
  }
  getFields(): Observable<any> {
    return this.http.get(`${this.apiUrl3}/data/getColumnNameCustomers`);
  }
  getFieldsF(): Observable<any> {
    return this.http.get(`${this.apiUrl3}/data/getColumnNameFinance`);
  }

  downloadCustomersData1() {
    const url = `${this.apiUrl2}/getAllCustomers`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((response: Blob) => {
        return {
          fileName: 'customers_data.csv',
          data: response
        };
      })
    );
  }

  getDataByEncryptionType(encryptionType: 'PlainText' | 'Masking' | 'Encryption', limit: number): Observable<User[]> {
    const endpointMap = {
        'PlainText': 'http://localhost:2972/data/getByLimitCustomers',
        'Masking': 'http://localhost:2972/data/getByLimitCustomers',
        'Encryption': 'http://localhost:2972/data/getByLimitCustomers'
    };
    const endpoint = endpointMap[encryptionType] || endpointMap['PlainText'];
    const headers = new HttpHeaders().set('limit', limit.toString());
    return this.http.get<User[]>(endpoint, { headers }).pipe(
        catchError((error) => {
            console.error('Error fetching data:', error);
            return of([]);
        })
    );
}

getDataByLimit(limit: number): Observable<any[]> {
  const headers = new HttpHeaders().set('limit', limit.toString());
  return this.http.get<any[]>('http://localhost:2972/data/getByLimitCustomers', { headers }).pipe(
      catchError((error) => {
          console.error('Error fetching data:', error);
          return of([]); // Mengembalikan array kosong jika terjadi error
      })
  );
}

getDataByEncryptionTypeF(encryptionType: 'PlainText' | 'Masking' | 'Encryption', limit: number): Observable<User[]> {
  const endpointMap = {
      'PlainText': 'http://172.24.168.134:2972/data/getByLimitFinance',
      'Masking': 'http://172.24.168.134:2972/data/getByLimitFinance',
      'Encryption': 'http://172.24.168.134:2972/data/getByLimitFinance'
  };
  const endpoint = endpointMap[encryptionType] || endpointMap['PlainText'];
  const headers = new HttpHeaders().set('limit', limit.toString());
  return this.http.get<User[]>(endpoint, { headers }).pipe(
      catchError((error) => {
          console.error('Error fetching data:', error);
          return of([]);
      })
  );
}

  getFields1(): Observable<any> {
    return this.http.get(`${this.apiUrl2}/data/getColumnNameCustomers`);
  }

  getFieldsIsc(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fieldsProd`);
  }

  getFieldsHrd(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fieldsProdHrd`);
  }

  getFieldsBrisim(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fieldsProdBrisim`);
  }

  // getFields(): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.apiUrl}/fields`);
  // }

  // addUser(user: any): Observable<any> {
  //   return this.http.post(this.apiUrl, user);
  // }

  // updateUser(id: number, user: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}`, user);
  // }

  // deleteUser(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
