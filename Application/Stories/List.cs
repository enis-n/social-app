using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Stories
{
    public class List
    {
        public class Query : IRequest<List<Story>>{ }

        public class Handler : IRequestHandler<Query, List<Story>>
        {

        private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Story>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Stories.ToListAsync();
            }
        }
    }
}