using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AirQi.Models.Core;
using AirQi.Repository.Core;
using AirQi.Settings;
using AirQi.Hubs;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace AirQi.Services.RecurringJobs.Core
{
    public class PullSmartCitizen : WorkerService
    {
        private HttpClient _client;
        private string url = "https://api.smartcitizen.me/v0/devices/world_map";
        public PullSmartCitizen(IMongoDataRepository<Station> repository, IWorkerSettings settings, IHubContext<LiveStationHub> hub, IMapper mapper) : base(repository, settings, hub, mapper)
        {
            this.Hub = base.Hub;
            this.Mapper = mapper;
            this.Repository = repository;
            this.Settings = settings;
            this.Client = new HttpClient();
        }

        public HttpClient Client { get => _client; set => _client = value; }

        public override async Task PullDataAsync()
        {
            // Gets headers which should be sent in each request.
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await Client.GetAsync(url);

            // Throws an Exception if the HttpResponseMessage.IsSuccessStatusCode property for HTTP response is 'false'. 
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();

            var json = JsonConvert.SerializeObject(responseBody);
        }
        
    }
}