using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<PostAttendee> PostAttendees { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<StoryAttendee> StoryAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<PostAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.PostId }));

            builder.Entity<PostAttendee>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Posts)
            .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<PostAttendee>()
           .HasOne(u => u.Post)
           .WithMany(a => a.Attendees)
           .HasForeignKey(aa => aa.PostId);

            builder.Entity<StoryAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.StoryId }));

            builder.Entity<StoryAttendee>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Stories)
            .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<StoryAttendee>()
            .HasOne(u => u.Story)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.StoryId);
        }
    }
}