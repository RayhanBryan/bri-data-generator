// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {

// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Validasi simple untuk demonstrasi (sesuaikan dengan autentikasi yang diinginkan)
    if (this.username === 'admin' && this.password === 'admin123') {
      // Redirect ke halaman /data-generator jika login berhasil
      this.router.navigate(['/data-generator']);
    } else {
      alert('Username atau password salah!');
    }
  }
}
