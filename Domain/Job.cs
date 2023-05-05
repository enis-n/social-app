using System;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }
        public String Title { get; set; }
        public String Description { get; set; }
        public String Category { get; set; }
        public DateTime Date { get; set; }
        public String Location { get; set; }
        public String Salary { get; set; }
        public String Company { get; set; }
    }
}