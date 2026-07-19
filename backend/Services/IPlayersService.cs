using ClashStats.Api.Models;

namespace ClashStats.Api.Services;

public interface IPlayersService
{
    Task<ServiceResult> GetPlayerDataAsync(string playerTag, string endpointSuffix = "");
}