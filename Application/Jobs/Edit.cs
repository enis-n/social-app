using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Job Job { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs.FindAsync(request.Job.Id);

                _mapper.Map(request.Job, job);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}