import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'build-speed-project';

  // zoom level when the duration is less than 10 minutes
  
  zoomLevels = [1,15,30,60,60*15,60*30,60*60];
  zoomLevelsMinorTicks = [32,15,15,10,15,30,30];
  totalAllowedZoomLevels = 5;

  ticks : number[] = [];
  minorTicks : number[] = [];
  currentZoomIndex = 2;
  minDuration : number  = 60*60*8; // 10 minute
  totalDuration : number = 60;
  actualDuration :  number = 0;

  // total duration of the mashup should be divided in the max 5 zoom levels
  // minimun duration of the timeline should be fixed

  //Zoom in is like having a narrow-minded perspective. As compared to zoom out, having an open mind, macro and broad perspective open to possibilities.

  // zoom in means going to frames and zoom out means visualing in hours
  //+ means going in the short units
  //- means going in to the large units 

  ngOnInit(): void {
    this.renderTicks();  
  }

  renderTicks() {

    this.actualDuration = this.totalDuration <  this.minDuration ?  this.minDuration : this.totalDuration;
    this.zoomLevels = this.zoomLevels.filter( a=> a <= this.actualDuration );
      let scaleTime = this.actualDuration / this.zoomLevels[this.currentZoomIndex];
      this.ticks = [];
      for ( let i=1; i<= scaleTime; i++ ){
        this.ticks.push(i);
      }

      this.minorTicks = [];
      for ( let i=1; i<= this.zoomLevelsMinorTicks[this.currentZoomIndex]; i++ ){
        this.minorTicks.push(i);
      }
  }

  zoomIn() {
    //going to frames 
    this.currentZoomIndex--;
    this.renderTicks();
  }

  zoomOut(){
    // going to hours
    this.currentZoomIndex++;
    this.renderTicks();
  }
}
