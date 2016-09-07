using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Asset1.Domain.Entities;
using Asset1.Business.Directors.PeopleDirector;
using Asset1.Domain.Seed;
using Asset1.Domain.Repositories;
using Newtonsoft.Json.Serialization;
using AutoMapper;
using Asset1.ViewModels;
using Microsoft.EntityFrameworkCore;
using Asset1.PlatformClient.PeopleClient;
using Asset1.Business.Builders.PeopleBuilder;

namespace Asset1.Web
{
    public class Startup
    {
        private IHostingEnvironment _env;

        /* -- HOW TO USE CONFIG FILE 
         * Include IConfigurationRoot config : as an argument to your method. 
         * Then use _config = config : NOTE * Dependency Injection.
         * --
         * Use: 
         * _config["API:base"] : This will return http://api.randomuser.me
         */
        private IConfigurationRoot _config;


        public Startup(IHostingEnvironment env)
        {
            _env = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(_env.ContentRootPath) //let the compiler know where the config file resides
                .AddJsonFile("config.json")
                .AddEnvironmentVariables(); //override whats in the config.json file with the environment variables. Set inside Asset1.Web's properties environment variables.
                
            _config = builder.Build();


            //better senario below in config.
            using (var context = new PeopleContext(_config,new Microsoft.EntityFrameworkCore.DbContextOptions<PeopleContext>()))
            {
                try
                {
                    context.Person.Any();
                }
                catch (Exception ex)
                {
                    //context.Database.EnsureCreated();
                    context.Database.Migrate();
                }
               
            }
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            /* --- DEPENDENCY INJECTION - SETUP -- */
            // INstance when need and keep cached around
            // AddScoped : instance for each request
            // AddSingleton : Return one instance and return that same instance everytime it is asked for
            //services.AddTransient<IMyService, DebugSerivice>();
            services.AddSingleton(_config);
            


            if (_env.IsEnvironment("Development") || _env.IsEnvironment("Testing")) //will I have a testing... probably not for this application
            {
                //TODO Create a mock repo for testing
                //services.AddScoped<IPersonRepository, MockPersonRepository>();
            } else 
            {
                //Set dependency injection to what you need for production
            }

            //Seed Data
            services.AddTransient<Asset1ContextSeedData>();
            services.AddDbContext<PeopleContext>();

            //Do Dev stuff here: EXAMPLE - Mock Services
            services.AddScoped<IPeopleDirector, PeopleDirector>();
            services.AddScoped<IPeopleBuilder, PeopleBuilder>();
            services.AddSingleton<IPeopleServiceClient, PeopleServiceClient>();

            //Only one per requrest cycle
            services.AddScoped<IPersonRepository, PersonRepository>();
            services.AddMvc()
                .AddJsonOptions(
                    config =>
                        config.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver()

                )
                .AddJsonOptions(
                    config =>
                        config.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter())
                );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app, 
            IHostingEnvironment env, 
            ILoggerFactory loggerFactory,
            Asset1ContextSeedData seeder
        )
        {
            //using (var dataContext = (PeopleContext)app.ApplicationServices.GetService(typeof(PeopleContext)))
            //{
            //    dataContext.Database.Migrate();
            //}

                //Initialize our Mappers 
                Mapper.Initialize(
                    config =>
                    {
                        config.CreateMap<PersonViewModel, Person>().ReverseMap(); //sets up both directions of mapping using ReverseMap
                    }
                );



            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                loggerFactory.AddDebug(LogLevel.Information);
            } else
            {
                loggerFactory.AddDebug(LogLevel.Error);
            }
            
            app.UseStaticFiles();
            app.UseMvc( config =>
                {
                    config.MapRoute(
                        name: "Default",
                        template: "{controller}/{action}/{id?}",
                        defaults: new { controller = "App", action = "Dashboard" }
                   );
                }
            );

            seeder.EnsureSeedData().Wait();
        }
    }
}
