using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Story
    {
        public Guid Id { get; set; }
        public String Username { get; set; }
        public String Caption { get; set; }
        public String ImageUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<StoryAttendee> Attendees { get; set; }

    }
}