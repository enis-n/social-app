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
            await SeedPosts(context);
            await SeedStories(context);
        }

        public static async Task SeedPosts(DataContext context){
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

        public static async Task SeedStories(DataContext context){
         
            if(context.Stories.Any()) return;

            var stories = new List<Story>
            {
                new Story
                {
                    Username = "filani420",
                    Caption = "Hello world",
                    ImageUrl = "https://plus.unsplash.com/premium_photo-1669986386171-5f54aee0a73b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                }
            };

            await context.Stories.AddRangeAsync(stories);
            await context.SaveChangesAsync();
        }
    }
}