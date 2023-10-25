// monty-hall.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SimulationRequest {
  numGames: number;
  switchDoor: boolean;
}

export interface SimulationResult {
  gameNumber: number;
  outcome: string;
}

@Injectable({
  providedIn: 'root'
})
export class MontyHallService {
  private apiEndpoint = 'https://localhost:7021/api/montyhall/simulate';
  private gameResults: SimulationResult[] = [];

  constructor(private http: HttpClient) { }

  simulateGames(request: SimulationRequest): Observable<SimulationResult[]> {
    return this.http.post<SimulationResult[]>(this.apiEndpoint, request);
  }

  getGameResults(): SimulationResult[] {
    return this.gameResults;
  }
}
