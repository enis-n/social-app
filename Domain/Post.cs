using System;
using System.Collections.Generic;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Venue { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<PostAttendee> Attendees { get; set; } = new List<PostAttendee>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}