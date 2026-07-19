using Microsoft.AspNetCore.Mvc;
using ClashStats.Api.Services;

namespace ClashStats.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationsController : ControllerBase
{
    private readonly ILocationsService _locationsService;

    public LocationsController(ILocationsService locationsService)
    {
        _locationsService = locationsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetLocationsAsync()
    {
        var result = await _locationsService.GetLocationsAsync();

        if (!result.IsSuccess)
        {
            return StatusCode((int)result.StatusCode, result.Content);
        }

        return Content(result.Content, "application/json");
    }

    [HttpGet("{locationId}")]
    public async Task<IActionResult> GetLocationAsync(int locationId) =>
        await HandleServiceCallAsync(locationId, "");

    [HttpGet("{locationId}/rankings/clans")]
    public async Task<IActionResult> GetLocationRankingsClansAsync(int locationId) =>
        await HandleServiceCallAsync(locationId, "/rankings/clans");

    [HttpGet("{locationId}/rankings/players")]
    public async Task<IActionResult> GetLocationRankingsPlayersAsync(int locationId) =>
        await HandleServiceCallAsync(locationId, "/rankings/players");

    [HttpGet("{locationId}/rankings/capitals")]
    public async Task<IActionResult> GetLocationRankingsCapitalsAsync(int locationId) =>
        await HandleServiceCallAsync(locationId, "/rankings/capitals");

    private async Task<IActionResult> HandleServiceCallAsync(int locationId, string endpointSuffix)
    {
        var result = await _locationsService.GetLocationDataAsync(locationId, endpointSuffix);

        if (!result.IsSuccess)
        {
            return StatusCode((int)result.StatusCode, result.Content);
        }

        return Content(result.Content, "application/json");
    }
}