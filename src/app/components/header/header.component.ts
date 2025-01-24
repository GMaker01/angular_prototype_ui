import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, CommonModule, NzGridModule, NzHeaderComponent, NzDropDownModule, NzIconModule],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  data: any = [];
  constructor(private dataService: DataService, private router: Router) {
    this.data = this.dataService.getData();
  }

  ngOnInit() {
  }

  navigateCategory(type: string, id: string, locationId?: string) {
    if (locationId) {
      this.router.navigate(['/category'], { queryParams: { type, id, locationId } });
      return;
    }
    this.router.navigate(['/category'], { queryParams: { type, id } });
  }
}

