using Microsoft.AspNetCore.Mvc;
using MontyHallProblem.DTO;
using System;

[Route("api/montyhall")]
public class MontyHallController : Controller
{
    [HttpPost("simulate")]
    public IActionResult SimulateMontyHallGames([FromBody] SimulationRequestDTO simulationRequest)
    {
        int numGames = simulationRequest.NumGames;//number of games
        bool switchDoor = simulationRequest.SwitchDoor;//choice to swith the door

        List<SimulationResultDTO> results = new List<SimulationResultDTO>();
        Random random = new Random();

        for (int gameNumber = 1; gameNumber <= numGames; gameNumber++)
        {
            int carBehind = random.Next(3);//places car behind a random door
            int playerChoice = random.Next(3);//initial choice of player
            int revealedGoat = Enumerable.Range(0, 3).Except(new[] { carBehind, playerChoice }).First();//reveals goat by opening door
            int finalChoice = switchDoor ? Enumerable.Range(0, 3).Except(new[] { playerChoice, revealedGoat }).First() : playerChoice;//final choice or user

            string outcome = finalChoice == carBehind ? "win" : "lose";

            results.Add(new SimulationResultDTO(gameNumber, outcome));
        }

        return Ok(results);
    }
}
