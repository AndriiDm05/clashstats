using ClashStats.Api.Models;

namespace ClashStats.Api.Services;

public interface ILocationsService
{
    Task<ServiceResult> GetLocationsAsync();
    Task<ServiceResult> GetLocationDataAsync(int locationId, string endpointSuffix = "");
}