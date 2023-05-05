using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Jobs;

namespace API.Controllers
{
    public class JobsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Job>>> GetJobs()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateJob(Job job)
        {
            return Ok(await Mediator.Send(new Create.Command { Job = job }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditJob(Guid id, Job job)
        {
            job.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Job = job }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}