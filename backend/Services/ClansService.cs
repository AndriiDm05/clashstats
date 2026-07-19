using ClashStats.Api.Models;

namespace ClashStats.Api.Services;

public class ClansService : BaseClashService, IClansService
{
    public ClansService(IHttpClientFactory httpClientFactory, ILogger<ClansService> logger)
        : base(httpClientFactory, logger)
    {
    }

    public async Task<ServiceResult> GetClanDataAsync(string clanTag, string endpointSuffix = "")
    {
        // Hits "clans/{encodedTag}{suffix}"
        return await SendRequestAsync(clanTag, "clans", endpointSuffix);
    }
}