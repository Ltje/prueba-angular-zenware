import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() sidePosition;
  ngOnInit(): void {
    console.log(this.sidePosition);

  }
  goToEmployees() {
    this.router.navigate(['/employees'])
  }
}
