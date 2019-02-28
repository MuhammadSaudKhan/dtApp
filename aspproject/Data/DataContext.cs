using aspproject.Model;
using Microsoft.EntityFrameworkCore;

namespace aspproject.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options){}
        public DbSet<category> categories { get; set; }
        public DbSet<users> Users { get; set; }
    }
}