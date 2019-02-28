using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using aspproject.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace aspproject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private DataContext  db;
        public ValuesController(DataContext mDb)
        {
            db=mDb;
        }
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
          var cat=await  db.categories.ToListAsync();
          return Ok(cat);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var cat=await  db.categories.FirstOrDefaultAsync(v=>v.Id==id);
            return Ok(cat);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
