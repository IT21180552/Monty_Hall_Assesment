var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(options => options
    .WithOrigins("http://localhost:4200") 
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
);

app.MapControllers();

app.Run();


