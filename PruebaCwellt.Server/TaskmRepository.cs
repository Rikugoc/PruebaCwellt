using PruebaCwellt.Server.Interfaces;
using Microsoft.EntityFrameworkCore;
using PruebaCwellt.Server.Classes;
using System.Threading.Tasks;

namespace PruebaCwellt.Server
{
    public class TaskmRepository : ITaskmRepository
    {
        public TaskmRepository()
        {
            using (var context = new ApiContext()){
                var Taskms = new List<Taskm>();
            }
        }

        public List<Taskm> GetTaskms()
        {
            using (var context = new ApiContext())
            {
                var Taskms = context.Taskms.ToList();
                return Taskms;
            }
        }

        public Taskm GetTaskmsByID(int id)
        {
            using (var context = new ApiContext())
            {
                var Taskms = context.Taskms.ToList();
                for (int i = 0; i < Taskms.Count; i++)
                {
                    if (Taskms[i].Id == id)
                    {
                        return Taskms[i];
                        break;
                    }
                }
                return null;
            }
        }

        public void AddTaskms(Taskm task)
        {
            using (var context = new ApiContext())
            {
                context.Taskms.Add(task);
                context.SaveChanges();
            }
        }

        public void DeleteTaskms(int id)
        {
            using (var context = new ApiContext())
            {
                foreach (Taskm obj in context.Taskms)
                {
                    if (obj.Id == id)
                    {
                        context.Taskms.Remove(obj);
                    }
                }
                context.SaveChanges();
            }
        }

        public void UpdateTaskms(Taskm task, int id)
        {
            using (var context = new ApiContext())
            {
                foreach(Taskm obj in context.Taskms)
                {
                    if (obj.Id == id)
                    {
                        obj.Id = task.Id;
                        obj.IsCompleted = task.IsCompleted;
                        obj.CreatedAt = task.CreatedAt;
                        obj.Description = task.Description;
                        obj.Title = task.Title;
                    }
                }
                context.SaveChanges();
            }
        }
    }
}
