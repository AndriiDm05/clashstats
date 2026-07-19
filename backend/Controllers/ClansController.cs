using Microsoft.AspNetCore.Mvc;
using ClashStats.Api.Services;
using System.Net;

namespace ClashStats.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClansController : ControllerBase
{
    private readonly IClansService _clansService;
    private readonly ILogger<ClansController> _logger;

    public ClansController(IClansService clansService, ILogger<ClansController> logger)
    {
        _clansService = clansService;
        _logger = logger;
    }

    [HttpGet("{clanTag}")]
    public async Task<IActionResult> GetClanAsync(string clanTag) =>
        await HandleServiceCallAsync(clanTag, "");

    [HttpGet("{clanTag}/members")]
    public async Task<IActionResult> GetClanMembersAsync(string clanTag) =>
        await HandleServiceCallAsync(clanTag, "/members");

    [HttpGet("{clanTag}/capitalraidseasons")]
    public async Task<IActionResult> GetCapitalRaidSeasonsAsync(string clanTag) =>
        await HandleServiceCallAsync(clanTag, "/capitalraidseasons");

    [HttpGet("{clanTag}/currentwar")]
    public async Task<IActionResult> GetCurrentWarAsync(string clanTag) =>
        await HandleServiceCallAsync(clanTag, "/currentwar");

    [HttpGet("{clanTag}/currentwar/leaguegroup")]
    public async Task<IActionResult> GetCurrentWarLeagueGroupAsync(string clanTag) =>
        await HandleServiceCallAsync(clanTag, "/currentwar/leaguegroup");

    [HttpGet("{clanTag}/warlog")]
    public async Task<IActionResult> GetWarlogAsync(string clanTag)
    {
        var result = await _clansService.GetClanDataAsync(clanTag, "/warlog");

        if (!result.IsSuccess)
        {
            if (result.StatusCode == HttpStatusCode.Forbidden)
            {
                _logger.LogInformation("Clan {clanTag} has set their war log to Private.", clanTag);
                return StatusCode(403, new
                {
                    error = "PrivateWarLog",
                    message = "This clan has set their War Log to private in-game. We cannot retrieve this data."
                });
            }

            return StatusCode((int)result.StatusCode, result.Content);
        }

        return Content(result.Content, "application/json");
    }

    private async Task<IActionResult> HandleServiceCallAsync(string clanTag, string endpointSuffix)
    {
        var result = await _clansService.GetClanDataAsync(clanTag, endpointSuffix);

        if (!result.IsSuccess)
        {
            return StatusCode((int)result.StatusCode, result.Content);
        }

        return Content(result.Content, "application/json");
    }
}