# Stage 1: Build the C# application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build release
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Run the compiled binaries
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# Render dynamically assigns a port via the PORT environment variable
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "ClashStats.Api.dll"]