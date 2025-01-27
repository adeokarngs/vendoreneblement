import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

export class Base<T, CONTEXT> implements IBase<T> {
    public url: string;

    constructor(public http: HttpClient, private context: CONTEXT) {
        // Dynamically constructing the URL based on the provided CONTEXT
        this.url = `${environment.BASE_URL}${this.context}`;
    }
    // Fetch a list of items
    list(): Observable<any> {
        return this.http.get<any>(`${this.url}`);
    }

    // Add a new item
    add(item: T): Observable<any> {
        return this.http.post<any>(`${this.url}`, item);
    }

    // Fetch a single item by ID
    get(id: number): Observable<any> {
        return this.http.get<any>(`${this.url}/${id}`);
    }

    // Update an item by ID
    update(id: number, item: any): Observable<any> {
        return this.http.put<any>(`${this.url}/${id}`, item);
    }

    // Delete an item by ID
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }

}

export interface IBase<MODEL> {
    list(item: any): any;
    add(item: MODEL): void;
    get(id: number): any | undefined;
    update(id: number, item: MODEL): void | any;
    delete(id: number): void | any;
}