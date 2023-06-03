using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Posts.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "filani", UserName = "filani420", Email = "filani@test.com"},
                    new AppUser{DisplayName = "eli", UserName = "eli420", Email = "eli@test.com"},
                    new AppUser{DisplayName = "enis", UserName = "enisi420", Email = "enisi@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Passw0rd");
                }

                var posts = new List<Post>
                {
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Post 2 months ago",
                        Category = "drinks",
                        Venue = "Pub",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[0],
                                    isHost = true
                                },
                                new PostAttendee
                                {
                                    AppUser = users[1],
                                    isHost = false
                                }
                            }
                    },
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Post 1 month ago",
                        Category = "culture",
                        Venue = "Louvre",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[0],
                                    isHost = true
                                },
                                new PostAttendee
                                {
                                    AppUser = users[2],
                                    isHost = false
                                }
                            }
                    },
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 3",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Post 1 month in future",
                        Category = "culture",
                        Venue = "Natural History Museum",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[1],
                                    isHost = true
                                },
                                new PostAttendee
                                {
                                    AppUser = users[0],
                                    isHost = false
                                }
                            }
                    },
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 4",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Post 2 months in future",
                        Category = "music",
                        Venue = "O2 Arena",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[1],
                                    isHost = true
                                },
                                new PostAttendee
                                {
                                    AppUser = users[0],
                                    isHost = false
                                }
                            }
                    },
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 5",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Post 3 months in future",
                        Category = "drinks",
                        Venue = "Another pub",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[1],
                                    isHost = true
                                },
                                new PostAttendee
                                {
                                    AppUser = users[0],
                                    isHost = false
                                }
                            }
                    },
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 6",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Post 4 months in future",
                        Category = "drinks",
                        Venue = "Yet another pub",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[1],
                                    isHost = true
                                },
                                new PostAttendee
                                {
                                    AppUser = users[0],
                                    isHost = false
                                }
                            }
                    },
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 6",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Post 5 months in future",
                        Category = "drinks",
                        Venue = "Just another pub",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[0],
                                    isHost = true
                                },
                                new PostAttendee
                                {
                                    AppUser = users[1],
                                    isHost = false
                                }
                            }
                    },
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 7",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Post 6 months in future",
                        Category = "music",
                        Venue = "Roundhouse Camden",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[1],
                                    isHost = true
                                },
                            }
                    },
                    new Post
                    {
                        Title = "Posting For Lab 1 Post Number 8",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Post 2 months ago",
                        Category = "travel",
                        Venue = "Somewhere on the Thames",
                        Attendees = new List<PostAttendee>
                            {
                                new PostAttendee
                                {
                                    AppUser = users[2],
                                    isHost = true
                                },
                            }
                    },
                };

                await context.Posts.AddRangeAsync(posts);
                await context.SaveChangesAsync();
            }

            await SeedStories(context);
        }

       
        public static async Task SeedStories(DataContext context)
        {

            if (context.Stories.Any()) return;

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