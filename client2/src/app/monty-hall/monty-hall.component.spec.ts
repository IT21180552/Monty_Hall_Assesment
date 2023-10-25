import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MontyHallComponent } from './monty-hall.component';
import { MontyHallService, SimulationRequest, SimulationResult } from '../monty-hall.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('MontyHallComponent', () => {
  let component: MontyHallComponent;
  let fixture: ComponentFixture<MontyHallComponent>;
  let montyHallService: MontyHallService;

  const mockResponse: SimulationResult[] = [
    { gameNumber: 1, outcome: 'win' },
    { gameNumber: 2, outcome: 'lose' },
    { gameNumber: 3, outcome: 'win' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MontyHallComponent],
      providers: [MontyHallService],
      imports: [HttpClientTestingModule],
    });
  
    fixture = TestBed.createComponent(MontyHallComponent);
    component = fixture.componentInstance;
    montyHallService = TestBed.inject(MontyHallService);
  });
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.numGames).toBe(100);
    expect(component.changeDoor).toBe(true);
    expect(component.winPercentage).toBe(0);
    expect(component.results.length).toBe(0);
  });

  it('should set responseHeading to "Results" after simulating games', () => {
    const request: SimulationRequest = {
      numGames: component.numGames,
      switchDoor: component.changeDoor,
    };

    spyOn(montyHallService, 'simulateGames').and.returnValue(of(mockResponse));

    component.simulateGames();

    expect(component.responseHeading).toBe('Results');
  });

  it('should set responseHeading to "Please enter a valid number of games" if numGames is less than 1', () => {
    component.numGames = 0;

    component.simulateGames();

    expect(component.responseHeading).toBe('Please enter a valid number of games');
  });

  it('should update winPercentage, winGames, and lostGames after simulating games', () => {
    spyOn(montyHallService, 'simulateGames').and.returnValue(of(mockResponse));

    component.simulateGames();

    expect(component.winPercentage).toBe(2 / 3);
    expect(component.winGames).toBe(2);
    expect(component.lostGames).toBe(1);
  });
});
