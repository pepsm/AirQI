namespace AirQi.Dtos.Core
{
    public class MeasurementStationReadDto
    {        
        public string Parameter { get; set; }

        public double  Value { get; set; }

        public string Unit { get; set; }
                
        public string SourceName { get; set; }
    }
}