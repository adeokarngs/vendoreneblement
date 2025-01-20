import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: false,
  
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {


 
  constructor(private http:HttpClient) {
    
  }
  ngOnInit(){
    this.http.get("https://localhost:7068/WeatherForecast").subscribe({
      next:(resp:any)=>{
        alert(JSON.stringify(resp.data))
      },
      error:(err:Error)=>{
        alert(err.message)
      }
    })
  }
}
