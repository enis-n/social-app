using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query
            {
                Username = username
            }));
        }
        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{username}/posts")]
        public async Task<IActionResult> GetUserPosts(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListPost.Query
            { Username = username, Predicate = predicate }));
        }
    }
}