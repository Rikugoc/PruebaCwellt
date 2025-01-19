using Microsoft.EntityFrameworkCore;
using PruebaCwellt.Server.Classes;

namespace PruebaCwellt.Server
{
    public class ApiContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "AuthorDb");
        }
        public DbSet<Taskm> Taskms { get; set; }
    }
}
