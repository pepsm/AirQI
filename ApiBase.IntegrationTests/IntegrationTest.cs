﻿using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ApiBase.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace ApiBase.IntegrationTests
{
    public class IntegrationTest
    {
        protected readonly HttpClient TestClient;
        protected IntegrationTest()
        {
            var appFactory = new WebApplicationFactory<Startup>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        services.RemoveAll(typeof(ApplicationContext));
                        services.AddDbContext<ApplicationContext>((options, context) =>
                        {
                            context.UseSqlServer("");
                        });
                    });
                });
            TestClient = appFactory.CreateClient();
        }

        protected async Task AuthenticateAsync()
        {
            TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvblNlcnZlciIsImp0aSI6ImQ4NzkwYjdjLTliZjctNGIxYy1iZGExLTJhOTkyYWZkZTk3ZCIsImlhdCI6IjEyLzA2LzIwMjAgMjM6MDQ6MzUiLCJJZCI6IjE2IiwiVXNlcm5hbWUiOiJ0ZXN0IiwiRmlyc3ROYW1lIjoiVGVzdCIsIkxhc3ROYW1lIjoiVXNlciIsIlVzZXJSb2xlIjoiVXNlciIsImV4cCI6MTYwNzM4MjI3NSwiaXNzIjoiQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJBdXRoZW50aWNhdGlvblNlcnZlciJ9.qdqjH6fq1TgURaKS2gik3Yf03OOBymcOln3Y9ig9eO0");
        }
    }
}
