using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Create
    {
        public class Command : IRequest
        {
            public Job Job { get; set; }
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
                _context.Jobs.Add(request.Job);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}