using Asset1.Domain.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Asset1.ViewModels
{
    public class PersonViewModel
    {
        

        public int Id { get; set; }
        public Gender Gender { get; set; }
        public ICollection<Interests> Interests { get; set; }
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
                if (this.FirstName != null && this.LastName != null)
                {
                    returnString.Append(this.FirstName + ' ' + this.LastName);
                }
                else
                {
                    returnString.Append("Full Name Missing");
                }
                return returnString.ToString();
            }
        }
        
        public Location Address { get; set; }
        public int Age { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string Phone { get; set; }
        public Picture Picture { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
