using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class StoryAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid StoryId { get; set; }
        public Story Story { get; set; }
        public bool isHost { get; set; }
    }
}