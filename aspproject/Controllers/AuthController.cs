using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using aspproject.Data;
using aspproject.Dtos;
using aspproject.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace aspproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IAuthRepository _Repo;
        public IConfiguration _Config ;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _Config = config;
            _Repo = repo;
        }
        [HttpPost("register")]
        public async Task<IActionResult> register(UserForRegister register)
        {

            register.Username = register.Username.ToLower();
            if (await _Repo.UserExsits(register.Username))
            {
                return BadRequest("username already exists.");
            }
            var usertoCreate = new users()
            {
                Username = register.Username
            };
            var CreatedUser = await _Repo.Register(usertoCreate, register.Password);
            return StatusCode(204);
        }
        [HttpPost("login")]
        public async Task<IActionResult> login(loginDtos login)
        {
            //throw new Exception("Computer says no!");
            var userFromRepo = await _Repo.Login(login.Username, login.Password);
            if (userFromRepo == null)
                return Unauthorized();
            var myclaim = new[]{
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username)
            };
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_Config.GetSection("AppSetting:Token").Value));
            var creds= new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDesc=new SecurityTokenDescriptor(){
                    Subject=new ClaimsIdentity(myclaim),
                    Expires= DateTime.Now.AddDays(1),
                    SigningCredentials=creds
            };
            var tokenHandler= new JwtSecurityTokenHandler();
            var token= tokenHandler.CreateToken(tokenDesc);
            return Ok(new {
                token=tokenHandler.WriteToken(token)
            });
        }
    }
}
