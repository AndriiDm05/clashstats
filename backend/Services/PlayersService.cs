using ClashStats.Api.Models;

namespace ClashStats.Api.Services;

public class PlayersService : BaseClashService, IPlayersService
{
    public PlayersService(IHttpClientFactory httpClientFactory, ILogger<PlayersService> logger)
        : base(httpClientFactory, logger)
    {
    }

    public async Task<ServiceResult> GetPlayerDataAsync(string playerTag, string endpointSuffix = "")
    {
        // Hits "players/{encodedTag}{suffix}"
        return await SendRequestAsync(playerTag, "players", endpointSuffix);
    }
}