using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Asset1.Domain.Entities
{
    public class PeopleContext : DbContext
    {
        private IConfigurationRoot _config;

        public PeopleContext(IConfigurationRoot config, DbContextOptions<PeopleContext> options) 
            : base(options)
        {
            _config = config;
        }
        
        public DbSet<Person> Person { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(_config["ConnectionStrings:Asset1ConnectionString"], b => b.MigrationsAssembly("Asset1"));
        }
    }
}
