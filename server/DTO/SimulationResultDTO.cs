namespace MontyHallProblem.DTO
{
    public class SimulationResultDTO
    {
        public int GameNumber { get; set; }
        public string Outcome { get; set; }

        public SimulationResultDTO(int gameNumber, string outcome)
        {
            GameNumber = gameNumber;
            Outcome = outcome;
        }
    }
}
