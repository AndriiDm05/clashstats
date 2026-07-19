using Microsoft.AspNetCore.Mvc;
using ClashStats.Api.Services;
using System.Net;

namespace ClashStats.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlayersController : ControllerBase
{
    private readonly IPlayersService _playersService;

    public PlayersController(IPlayersService playersService)
    {
        _playersService = playersService;
    }

    [HttpGet("{playerTag}")]
    public async Task<IActionResult> GetPlayerAsync(string playerTag) =>
        await HandleServiceCallAsync(playerTag, "");

    [HttpGet("{playerTag}/battlelog")]
    public async Task<IActionResult> GetPlayerBattleLogAsync(string playerTag) =>
        await HandleServiceCallAsync(playerTag, "/battlelog");

    [HttpGet("{playerTag}/leaguehistory")]
    public async Task<IActionResult> GetPlayerLeagueHistoryAsync(string playerTag) =>
        await HandleServiceCallAsync(playerTag, "/leaguehistory");

    private async Task<IActionResult> HandleServiceCallAsync(string playerTag, string endpointSuffix)
    {
        var result = await _playersService.GetPlayerDataAsync(playerTag, endpointSuffix);

        if (!result.IsSuccess)
        {
            return StatusCode((int)result.StatusCode, result.Content);
        }

        return Content(result.Content, "application/json");
    }
}