using System.Net.Http.Headers;
using ClashStats.Api.Services;
using ClashStats.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(policyBuilder => policyBuilder.Expire(TimeSpan.FromSeconds(120)));
    options.AddPolicy("RankingsCache", policyBuilder => policyBuilder.Expire(TimeSpan.FromSeconds(300)));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddHttpClient("ClashApiClient", client =>
{
    var apiKey = builder.Configuration["ClashOfClans:ApiKey"];
    client.BaseAddress = new Uri("https://api.clashofclans.com/v1/");
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});

builder.Services.AddScoped<IClansService, ClansService>();
builder.Services.AddScoped<IPlayersService, PlayersService>();
builder.Services.AddScoped<ILocationsService, LocationsService>();

var app = builder.Build();

app.UseCors("AllowReactApp");

app.UseOutputCache();

app.UseAuthorization();
app.MapControllers();

app.Run();