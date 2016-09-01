using Asset1.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.ViewModels
{
    public class PersonViewModel
    {

        public enum SirName
        {
            Mr = 1,
            Mrs,
            Miss
        }

        public int Id { get; set; }
        public SirName Title { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string LastName { get; set; }

        public string FullName
        {
            get
            {
                var returnString = new StringBuilder();
                if (this.Title != null)
                {
                    returnString.Append(this.Title + " ");
                }
                if (this.FirstName != null && this.LastName != null)
                {
                    returnString.Append(this.FirstName + ' ' + this.LastName);
                }
                else
                {
                    throw new NullReferenceException("First and or last name cannot be null");
                }
                return returnString.ToString();
            }
        }
        
        public Location Location { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public Picture Picture { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
