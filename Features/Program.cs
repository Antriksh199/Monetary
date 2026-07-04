using Features.BL.Contracts;
using Features.BL.Implementation;
using Features.DL;
using Features.DL.Contracts;
using Features.DL.Implementation;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

NHibernateHelper.Initialize(builder.Configuration);

var awsOptions = builder.Configuration.GetSection("AWS");
var cognitoSettings = builder.Configuration.GetSection("Authentication:Cognito");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    // The issuer is always the Cognito User Pool URL
    options.Authority = cognitoSettings["Authority"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = cognitoSettings["Authority"],
        ValidateAudience = true,
        ValidAudience = cognitoSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromMinutes(5)
    };
});

builder.Services.AddControllers();



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

app.UseCors("AllowCloudFront");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
