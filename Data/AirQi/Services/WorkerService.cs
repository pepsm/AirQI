using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AirQi.Models.Core;
using AirQi.Repository;
using AirQi.Settings;
using Microsoft.AspNetCore.SignalR;
using AssetNXT.Hubs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using AutoMapper;
using AirQi.Dtos;
using System.Linq;

namespace AirQi.Services
{
    public class WorkerService : IWorkerService
    {
        private IMongoDataRepository<Station> _repository;
        private IHubContext<LiveStationHub> _hub;
        private IWorkerSettings _settings;
        private IMapper _mapper;

        public WorkerService(IMongoDataRepository<Station> repository, IWorkerSettings settings, IHubContext<LiveStationHub> hub, IMapper mapper)
        {
            this.Hub = hub;
            this.Mapper = mapper;
            this.Repository = repository;
            this.Settings = settings;
        }

        public IWorkerSettings Settings { get => _settings; set => _settings = value; }
        public IMapper Mapper { get => _mapper; set => _mapper = value; }
        public IMongoDataRepository<Station> Repository { get => _repository; set => _repository = value; }
        public IHubContext<LiveStationHub> Hub { get => _hub; set => _hub = value; }


        public virtual async Task PullDataAsync()
        {
            var stations = await _repository.GetAllAsync();
            stations = stations.OrderByDescending(doc => doc.UpdatedAt).GroupBy(doc => new { doc.Position }, (key, group) => group.First());

            IEnumerable<StationReadDto> stationDtos = Mapper.Map<IEnumerable<StationReadDto>>(stations);
          
            // SignalR event
            await Hub.Clients.All.SendAsync("GetNewStationsAsync", stations);
            Console.WriteLine("Trigger Websocket");

        }
        
    }
}