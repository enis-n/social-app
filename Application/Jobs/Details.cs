using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Details
    {
        public class Query : IRequest<Job>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Job>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Job> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Jobs.FindAsync(request.Id);
            }
        }
    }
}