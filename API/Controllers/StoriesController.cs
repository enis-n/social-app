using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Stories;


namespace API.Controllers
{
   
    public class StoriesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Story>>> GetStories()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Story>> GetStory(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateStory(Story story)
        {
            return Ok(await Mediator.Send(new Create.Command{Story = story}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditStory(Guid id, Story story)
        {
            story.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Story = story}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStory(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}