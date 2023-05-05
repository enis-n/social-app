using System;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public float Salary { get; set; }
        public string Company { get; set; }
    }
}