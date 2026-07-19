using ClashStats.Api.Models;

namespace ClashStats.Api.Services;

public interface IClansService
{
	Task<ServiceResult> GetClanDataAsync(string clanTag, string endpointSuffix = "");
}