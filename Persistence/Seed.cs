using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Post 2 months ago",
                    Category = "drinks",
                    Venue = "Pub",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Post 1 month ago",
                    Category = "culture",
                    Venue = "Louvre",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 3",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Post 1 month in future",
                    Category = "culture",
                    Venue = "Natural History Museum",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 4",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Post 2 months in future",
                    Category = "music",
                    Venue = "O2 Arena",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 5",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Post 3 months in future",
                    Category = "drinks",
                    Venue = "Another pub",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 6",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Post 4 months in future",
                    Category = "drinks",
                    Venue = "Yet another pub",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 6",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Post 5 months in future",
                    Category = "drinks",
                    Venue = "Just another pub",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 7",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Post 6 months in future",
                    Category = "music",
                    Venue = "Roundhouse Camden",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 8",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Post 2 months ago",
                    Category = "travel",
                    Venue = "Somewhere on the Thames",
                },
                new Post
                {
                    Title = "Posting For Lab 1 Post Number 9",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Post 8 months in future",
                    Category = "film",
                    Venue = "Cinema",
                }
            };

            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}