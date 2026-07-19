using System.Net;
using ClashStats.Api.Models;

namespace ClashStats.Api.Services;

public abstract class BaseClashService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger _logger;

    protected BaseClashService(IHttpClientFactory httpClientFactory, ILogger logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    protected async Task<ServiceResult> SendRequestAsync(string identifier, string pathPrefix, string endpointSuffix, bool isTag = true)
    {
        var formattedId = isTag ? (identifier.StartsWith("#") ? identifier : $"#{identifier}") : identifier;
        var encodedId = isTag ? Uri.EscapeDataString(formattedId) : formattedId;

        var client = _httpClientFactory.CreateClient("ClashApiClient");
        var relativeUrl = $"{pathPrefix}/{encodedId}{endpointSuffix}";

        try
        {
            var response = await client.GetAsync(relativeUrl);
            var content = await response.Content.ReadAsStringAsync();

            return new ServiceResult
            {
                IsSuccess = response.IsSuccessStatusCode,
                StatusCode = response.StatusCode,
                Content = content
            };
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP failure calling CoC API at {Url}", relativeUrl);
            return new ServiceResult
            {
                IsSuccess = false,
                StatusCode = HttpStatusCode.InternalServerError,
                Content = "Internal error connecting to Supercell game services."
            };
        }
    }

    protected async Task<ServiceResult> SendDirectRequestAsync(string path)
    {
        var client = _httpClientFactory.CreateClient("ClashApiClient");

        try
        {
            var response = await client.GetAsync(path);
            var content = await response.Content.ReadAsStringAsync();

            return new ServiceResult
            {
                IsSuccess = response.IsSuccessStatusCode,
                StatusCode = response.StatusCode,
                Content = content
            };
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP failure calling CoC API at {Url}", path);
            return new ServiceResult
            {
                IsSuccess = false,
                StatusCode = System.Net.HttpStatusCode.InternalServerError,
                Content = "Internal error connecting to Supercell game services."
            };
        }
    }
}