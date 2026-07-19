using ClashStats.Api.Models;

namespace ClashStats.Api.Services;

public class LocationsService : BaseClashService, ILocationsService
{
    public LocationsService(IHttpClientFactory httpClientFactory, ILogger<LocationsService> logger)
        : base(httpClientFactory, logger)
    {
    }

    public async Task<ServiceResult> GetLocationsAsync()
    {
        return await SendDirectRequestAsync("locations");
    }

    public async Task<ServiceResult> GetLocationDataAsync(int locationId, string endpointSuffix = "")
    {
        // Hits "locations/{locationId}{formattedSuffix}" passing `isTag: false` to avoid prepend of #
        return await SendRequestAsync(locationId.ToString(), "locations", endpointSuffix, isTag: false);
    }
}