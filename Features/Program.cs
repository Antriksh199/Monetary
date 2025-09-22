using Features.BL.Contracts;
using Features.BL.Implementation;
using Features.DL;
using Features.DL.Contracts;
using Features.DL.Implementation;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

NHibernateHelper.Initialize(builder.Configuration);

builder.Services.AddControllers();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = Environment.GetEnvironmentVariable(builder.Configuration["Authentication:Cognito:Authority"]);
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = Environment.GetEnvironmentVariable(builder.Configuration["Authentication:Cognito:Audience"]),
        ValidIssuer = Environment.GetEnvironmentVariable(builder.Configuration["Authentication:Cognito:Authority"])
    };
});

builder.Services.AddScoped<IIncomeBL, IncomeBL>();
builder.Services.AddScoped<IIncomeDL, IncomeDL>();
builder.Services.AddScoped<IExpenseBL, ExpenseBL>();
builder.Services.AddScoped<IExpenseDL, ExpenseDL>();
builder.Services.AddScoped<IInvestmentBL, InvestmentBL>();
builder.Services.AddScoped<IInvestmentDL, InvestmentDL>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
