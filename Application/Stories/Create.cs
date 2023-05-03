using System;
using System.Threading.Tasks;
using System.Threading;
using Domain;
using MediatR;
using Persistence;

namespace Application.Stories
{
    public class Create
    {
        public class Command : IRequest
        {
            public Story Story { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Stories.Add(request.Story);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}