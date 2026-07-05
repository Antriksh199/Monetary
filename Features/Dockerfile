# Base runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy only csproj first for caching
COPY ["Features.csproj", "./"]
RUN dotnet restore "Features.csproj"

# Copy the rest of the source
COPY . .

# Build and publish in one step (skip intermediate build output)
RUN dotnet publish "Features.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

# Copy NHibernate config
COPY DL/hibernate.cfg.xml ./DL/hibernate.cfg.xml

ENTRYPOINT ["dotnet", "Features.dll"]
