import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-context',
  templateUrl: './menu-context.component.html',
  styleUrls: ['./menu-context.component.scss']
})
export class MenuContextComponent implements OnInit {

  contextMenu : any;
  shareMenu   : any;
  constructor() { }

  ngOnInit(): void {
    this.contextMenu = document.querySelector(".wrapper");
    this.shareMenu   = this.contextMenu.querySelector(".share-menu") 

    document.addEventListener("contextmenu", e => {
      e.preventDefault();  //preventing default context menu of the browser

      let x = e.offsetX;
      let y = e.offsetY;

      let winWidth = window.innerWidth;
      let winHeight = window.innerHeight;
      
      let cmWidth  = this.contextMenu.offsetWidth;
      let cmHeight  = this.contextMenu.offsetHeight;

      
      // If x is greater than window width - contextMenu width - shareMenu width 
      // then show the share menu to the left, else show it to the right.

      if(x > (winWidth - cmWidth - this.shareMenu.offsetWidth)) {
        this.shareMenu.style.left = '-200px';
      }
      else {
        this.shareMenu.style.left = '';
        this.shareMenu.style.right = '-200px';
      }

      // If x is greater than window width - contextMenu width then set the x value 
      // to window width - contextMenu width else set x to the offsetX. Similarly to Y
      
      x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
      y = y > winHeight - cmHeight ? winHeight - cmHeight : y;
      
      console.log(x,y);
      
      this.contextMenu.style.left = `${x}px`;
      this.contextMenu.style.top = `${y}px`;
      this.contextMenu.style.visibility = "visible"; 

      
    })

    document.addEventListener("click", () => this.contextMenu.style.visibility = 'hidden')
  }



  

}
