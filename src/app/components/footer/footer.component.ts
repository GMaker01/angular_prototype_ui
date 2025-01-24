import { Component, OnInit } from '@angular/core';
import { NzFooterComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [NzFooterComponent],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
