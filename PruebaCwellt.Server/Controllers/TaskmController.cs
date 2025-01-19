using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaCwellt.Server.Classes;
using PruebaCwellt.Server.Interfaces;
namespace PruebaCwellt.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskmController : ControllerBase
    {
        readonly ITaskmRepository _TaskmRepository;
        public TaskmController(ITaskmRepository TaskmRepository)
        {
            _TaskmRepository = TaskmRepository;
        }
        [HttpGet]
        public ActionResult<List<Taskm>> Get()
        {
            return Ok(_TaskmRepository.GetTaskms());
        }

        [HttpGet("{id}")]
        public ActionResult<Taskm> GetById(int id)
        {
            return Ok(_TaskmRepository.GetTaskmsByID(id));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Taskm>> UpdateTaskm(Taskm taskm, int id)
        {
            _TaskmRepository.UpdateTaskms(taskm, id);

            return CreatedAtAction("GetTaskm", new { id = taskm.Id }, taskm);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Taskm>> DeleteTaskm(int id)
        {
            _TaskmRepository.DeleteTaskms(id);

            return Ok(_TaskmRepository.GetTaskmsByID(id));
        }

        [HttpPost]
        public async Task<ActionResult<Taskm>> PostTaskm(Taskm taskm)
        {
            _TaskmRepository.AddTaskms(taskm);

            return CreatedAtAction("GetTaskm", new { id = taskm.Id }, taskm);
        }
    }
}
