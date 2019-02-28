using System.ComponentModel.DataAnnotations;

namespace aspproject.Dtos
{
    public class loginDtos
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength= 4, ErrorMessage="Password length must be between 4 and 8 charactors")]
        public string Password { get; set; }
    }
}