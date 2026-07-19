using System.Net;

namespace ClashStats.Api.Models;

public class ServiceResult
{
    public bool IsSuccess { get; set; }
    public HttpStatusCode StatusCode { get; set; }
    public string Content { get; set; } = string.Empty;
}