
import { from } from 'rxjs';

import {catchError, 
      debounceTime, //tempo que o ajax espera para ser chamado
      distinctUntilChanged, //nao busca se o termo nao foi alterado
      switchMap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch',[
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', [
        animate('250ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  restaurants : Restaurant[]

  searchBarState : string = 'hidden'

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantService : RestaurantService,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(500),//tempo que o ajax espera para ser chamado
      distinctUntilChanged(),//nao busca se o termo nao foi alterado
      switchMap(searchTerm => 
        this.restaurantService.restaurants(searchTerm).pipe(
          catchError(error => from([]))
        )
      )
     ).subscribe(restaurants =>this.restaurants = restaurants);

    this.restaurantService.restaurants().subscribe(restaurants  => this.restaurants = restaurants);
  }

  toggleSearch() : void {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
