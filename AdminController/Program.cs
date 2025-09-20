using AdminController;
using AdminController.BL.Contracts;
using AdminController.BL.Implementation;
using AdminController.DL;
using AdminController.DL.contracts;
using AdminController.DL.Implementation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using NHibernate.Hql.Ast.ANTLR.Util;

var builder = WebApplication.CreateBuilder(args);

NHibernateHelper.Initialize(builder.Configuration);



// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
            builder =>
            {
                builder.WithOrigins("http://localhost:4200")
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
   
});

builder.Services.AddControllers();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["Authentication:Cognito:Authority"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Authentication:Cognito:Audience"],
        ValidIssuer = builder.Configuration["Authentication:Cognito:Authority"]
    };
});

builder.Services.AddScoped<IFrequencyBL, FrequencyBL>();
builder.Services.AddScoped<IFrequencyDL, FrequencyDL>();
builder.Services.AddScoped<IIncomeTypeBL, IncomeTypeBL>();
builder.Services.AddScoped<IIncomeTypeDL, IncomeTypeDL>();
builder.Services.AddScoped<IUserBL, UserBL>();
builder.Services.AddScoped<IUserDL, UserDL>();
builder.Services.AddScoped<IPaymentMethodBL, PaymentMethodBL>();
builder.Services.AddScoped<IPaymentMethodDL, PaymentMethodDL>();
builder.Services.AddScoped<IExpenseBL, ExpenseBL>();
builder.Services.AddScoped<IExpenseDL, ExpenseDL>();
builder.Services.AddScoped<IInvestmentBL, InvestmentBL>();
builder.Services.AddScoped<IInvestmentDL, InvestmentDL>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

