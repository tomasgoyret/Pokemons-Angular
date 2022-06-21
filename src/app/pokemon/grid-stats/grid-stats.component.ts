import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-stats',
  templateUrl: './grid-stats.component.html',
  styleUrls: ['./grid-stats.component.css']
})
export class GridstatsComponent implements OnInit {

@Input() stats! : any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.stats)
  }

}
