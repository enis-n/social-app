using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Stories
{
    public class Details
    {
        public class Query : IRequest<Story>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Story>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Story> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Stories.FindAsync(request.Id);
            }
        }
    }
}