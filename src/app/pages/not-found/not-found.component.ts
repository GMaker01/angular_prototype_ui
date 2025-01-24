import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  imports: [NzResultModule],
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['']);
  }

}
