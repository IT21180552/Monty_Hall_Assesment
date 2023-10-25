import { Component } from '@angular/core';
import { MontyHallService, SimulationRequest, SimulationResult } from '../monty-hall.service';

@Component({
  selector: 'app-monty-hall', 
  templateUrl: './monty-hall.component.html',
  styleUrls: ['./monty-hall.component.css']
})
export class MontyHallComponent {
  numGames: number = 100;
  changeDoor: boolean = true;
  winPercentage: number = 0;
  results: SimulationResult[] = [];
  winGames : number = 0;
  lostGames : number = 0;
  responseHeading : string = "";
  
  constructor(private montyHallService: MontyHallService) { }

  simulateGames() {
    const request: SimulationRequest = {
      numGames: this.numGames,
      switchDoor: this.changeDoor
    };

    this.responseHeading = "Results";
    if(this.numGames<1){
      this.responseHeading = "Please enter a valid number of games";
      return
    }

    this.montyHallService.simulateGames(request)
      .subscribe(data => {
        this.results = data;
        this.winGames = this.results.filter(r => r.outcome === 'win').length;
        this.lostGames = this.results.filter(r => r.outcome === 'lose').length;
        this.winPercentage = this.results.filter(r => r.outcome === 'win').length / this.numGames;
      });
  }

  getResultStyle(outcome: string): any {
    const defaultStyle = {};

    if (outcome === 'lose') {
      return { color: 'red' };
    } else if (outcome === 'win') {
      return { color: 'green' };
    }

    return defaultStyle;
  }
  
}
