import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="d-flex justify-content-center">
    <div class="spinner-grow" role="status" style="width: 6rem; height: 6rem;">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  `,
  styles: []
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
