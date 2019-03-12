using System;
using System.Threading.Tasks;
using aspproject.Model;
using Microsoft.EntityFrameworkCore;

namespace aspproject.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
            
        }
        public async Task<users> Login(string username, string password)
        {
            var user=await _context.Users.FirstOrDefaultAsync(u=>u.Username==username);
            if(user==null)
                return null;
            if(!verifyPasswordHash(password, user.PasswordSalt,user.PasswordHash))  
                return null;
            return user;

        }

        private bool verifyPasswordHash(string password,byte[] passwordSalt, byte[] passwordHash)
        {
            using (var hmac=new System.Security.Cryptography.HMACSHA512(passwordSalt)){
                var computedPasswordHash= hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0; i<computedPasswordHash.Length; i++){
                    if(computedPasswordHash[i]!=passwordHash[i])
                        return false;
                }
                return true;
            }
        }

        public async Task<users> Register(users user, string password)
        {
            byte[] passwordSalt, passwordHash;
            createPasswordHashWithSalt(password, out passwordSalt, out passwordHash);
            user.PasswordSalt=passwordSalt;
            user.PasswordHash=passwordHash;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void createPasswordHashWithSalt(string password, out byte[] passwordSalt, out byte[] passwordHash)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        public async Task<bool> UserExsits(string usersname)
        {
            if(await _context.Users.AnyAsync(u=>u.Username==usersname))
                return true;
            return false;    
            
        }
    }
}