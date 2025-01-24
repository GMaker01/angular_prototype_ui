import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  imports: [CommonModule, NzBreadCrumbModule, NzGridModule, NzCardModule],
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  name = '';
  data: any;
  categories: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.data = dataService.getData();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      let routeToHome = false;
      if (params && params.id && params.type) {
        console.log(params);
        if (params.type === 'branch') {
          if (params.locationId) {
            const location = this.data.locations.find((x: any) => x.dealers_id === params.id);
            if (location && location.branches && location.branches.length) {
              const data = location.branches.find((x: any) => x.branch_id === params.locationId);
              this.name = data.name;
              this.categories = data.categories.map((x: any) => ({ ...x, isImageLoaded: false }));
            } else {
              routeToHome = true;
            }
          } else {
            routeToHome = true;
          }
        } else if (params.type === 'location') {
          const location = this.data.locations.find((x: any) => x.dealers_id === params.id);
          this.name = location.name;
          if (location && location.branches && location.branches.length) {
            this.categories = [].concat.apply([], location.branches.map((x: any) => (x.categories)));
            this.categories = this.categories.map((x: any) => ({ ...x, isImageLoaded: false }));
            console.log(this.categories);
            // this.categories = data.categories;
          } else {
            routeToHome = true;
          }
        } else {
          routeToHome = true;
        }
      } else {
        routeToHome = true;
      }

      if (routeToHome) {
        this.router.navigate(['']);
      }
    });
  }

  goToSubCategories(categoryName: string) {
    this.router.navigate(['/sub-category'], { queryParams: { categoryName, name: this.name } });
  }

}
