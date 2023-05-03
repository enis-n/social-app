using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;

namespace Application.Stories
{
    public class Edit
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
                var story = await _context.Stories.FindAsync(request.Story.Id);

                story.Caption = request.Story.Caption ?? story.Caption;

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}