using System.Threading.Tasks;
using aspproject.Model;

namespace aspproject.Data
{
    public interface IAuthRepository
    {
         Task<users> Register(users user,string password);
         Task<users> Login(string username,string password);
         Task<bool> UserExsits(string usersname);
         
    }
}