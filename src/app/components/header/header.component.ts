import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    data: any;
    constructor(private dataService: DataService, private router: Router) {
        this.data = this.dataService.getData();
    }

    ngOnInit() {
    }

    navigateCategory(type: string, id: string, locationId: string) {
        this.router.navigate(['/category'], { queryParams: { type, id, locationId } });
        console.log(type, id, locationId);
    }
}
