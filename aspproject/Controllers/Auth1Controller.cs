using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using aspproject.Data;
using aspproject.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace aspproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Auth1Controller : ControllerBase
    {
        private readonly AuthRepository _repo;
        private readonly IConfiguration config;

        public Auth1Controller(AuthRepository repo, IConfiguration Config)
        {
            _repo = repo;
            config = Config;
        }       
        [HttpPost]
        public async Task<IActionResult> login(loginDtos login){
         var userInRepo= await _repo.Login(login.Username,login.Password);
         if(userInRepo==null)
            return Unauthorized();
         var myclaim= new[] {
             new Claim(ClaimTypes.NameIdentifier,userInRepo.Id.ToString()),
             new Claim(ClaimTypes.Name,userInRepo.Username)
         };
         var key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSetting:Token").Value));
         var creds=new SigningCredentials(key,SecurityAlgorithms.HmacSha256Signature);
         var desc= new SecurityTokenDescriptor(){
             Subject=new ClaimsIdentity(myclaim),
             Expires= System.DateTime.Now.AddDays(1),
             SigningCredentials=creds
         };   
         var hander= new JwtSecurityTokenHandler();
         var token= hander.CreateToken(desc);
         return Ok(new {token = hander.WriteToken(token) });
        }
    }
}