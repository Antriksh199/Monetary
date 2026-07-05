FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["AdminController.csproj", "./"]
RUN dotnet restore "AdminController.csproj"

# Copy everything else
COPY . .
RUN dotnet publish "AdminController.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

COPY DL/hibernate.cfg.xml ./DL/hibernate.cfg.xml

ENTRYPOINT ["dotnet", "AdminController.dll"]
