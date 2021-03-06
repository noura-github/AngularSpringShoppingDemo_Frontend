import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { WishItem } from 'src/app/models/wish-item';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  customerId:number;
  authenticatedUser:string;
  wishlist = [];



  constructor(private messengerService: MessengerService,
    private wishlistService: WishlistService) { 

      this.handleSubscription();
    }

  ngOnInit() {

    this.customerId = parseInt(localStorage.getItem("customerId"));
    this.authenticatedUser = localStorage.getItem("authenticatedUser");

    this.loadWishItems();
  }
  
  handleSubscription(){
    
    this.messengerService.getWishlisttemAsProductMsg().subscribe((items:WishItem[]) => {
      this.setWishlist(items);
     });

  }


  loadWishItems(){

    if (!this.authenticatedUser) return;

    this.wishlistService.getWishlist(this.customerId).subscribe((items: WishItem[]) => {

      this.setWishlist(items);
    });
  }
  

  removeItem(wishItem: WishItem){

    this.wishlistService.removeFromWishlist(this.customerId, wishItem).subscribe((items: WishItem[]) => {

      this.setWishlist(items);
    });
  }

  setWishlist(items: WishItem[]){
    this.wishlist = items;
  }

}
