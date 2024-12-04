// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'BRI-data-geenerator';
// }


// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'angular-crud-app';
// }

export class AppComponent implements OnInit {
  users: any[] = [];

  constructor(private dataService: DataService, ) {}

  ngOnInit(): void {
    this.dataService.getUsers2().subscribe(data => {
      this.users = data;
    });
  }

  // deleteUser(id: number): void {
  //   this.userService.deleteUser(id).subscribe(() => {
  //     this.users = this.users.filter(user => user.Id !== id);
  //   });
  // }
}
