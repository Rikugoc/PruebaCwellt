using PruebaCwellt.Server.Classes;

namespace PruebaCwellt.Server.Interfaces
{
    public interface ITaskmRepository
    {
        public List<Taskm> GetTaskms();
        public Taskm GetTaskmsByID(int id);
        public void AddTaskms(Taskm task);
        public void UpdateTaskms(Taskm task, int id);
        public void DeleteTaskms(int id);
    }
}
