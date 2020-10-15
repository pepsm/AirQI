using System;
using Aqi.Models.Data;

namespace Aqi.Dtos
{
    public class MeasurementsReadDto
    {
        public Location Location { get; set; }

        public double Pm025 { get; set; }
        
        public double Pm100 { get; set; }
        
        public double Aqi { get; set; }
        
        public double P { get; set; }

        public double H { get; set; }
        
        public double T { get; set; }
        
        public double O3 { get; set; }
        
        public double No2 { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}