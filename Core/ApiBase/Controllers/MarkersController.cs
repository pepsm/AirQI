
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBase.Data;
using ApiBase.DTOs;
using ApiBase.Hubs;
using ApiBase.Models;
using ApiBase.Services;
using ApiBase.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ApiBase.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MarkersController : ControllerBase
    {

        private readonly IEFRepository _repository;
        private readonly IHubContext<LiveMarkerHub> _hubContext;
        private readonly IHubContext<LiveNotificationHub> _hubNotificationContext;
        private readonly ISlaMarkerService _slaMarkerService;

        public MarkersController(IEFRepository repository, IHubContext<LiveMarkerHub> hubContext, IHubContext<LiveNotificationHub> hubNotificationContext, ISlaMarkerService slaService)
        {
            this._repository = repository;
            this._hubContext = hubContext;
            this._hubNotificationContext = hubNotificationContext;
            this._slaMarkerService = slaService;

        }

        // GET: api/markers
        [HttpGet]
        public async Task<IActionResult> GetMarkers()
        {
            var markers = await _repository.GetAllAsync<Marker>();

            return Ok(markers);
        }

        //GET api/markers/{id}
        [HttpGet("{id}", Name = "GetMarkerById")]
        public async Task<ActionResult<Marker>> GetMarkerById(int id)
        {
            var markerItem = await _repository.GetByIdAsync<Marker>(id);
            if (markerItem != null)
            {
                return Ok(markerItem);
            }
            return NotFound();
        }

        // POST: api/markers
        [HttpPost]
        public async Task<IActionResult> AddMarker(Marker marker)
        {
            

            var list = _slaMarkerService.GetSlaMarkers().ToList();
            var polygon = PolygonCheckerService.IsInPolygon(list, marker.latitude, marker.longitude);
            if (polygon == true)
            {
                // SignalR event
                var signalNotification = new NotificationDto
                {
                    Title = "Too many markers!",
                    Description = "You can not create a marker here",
                    Type = "Notify",
                    CreatedAt = DateTime.UtcNow.ToString()
                };
                await _hubNotificationContext.Clients.All.SendAsync("GetNewNotification", signalNotification);

                return Conflict();

            }

            var markerItem = await _repository.AddAsync(marker);

            // SignalR event
            await _hubContext.Clients.All.SendAsync("GetNewMarker", markerItem);

            return Ok(markerItem);
        }

        // Delete: api/markers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var markerItem = _repository.GetByIdAsync<Marker>(id).Result;
            if (markerItem == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<Marker>(markerItem);
            return NoContent();

        }
    }
}