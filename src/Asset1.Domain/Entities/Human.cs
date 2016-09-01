using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Domain.Entities
{
    public enum Gender
    {
        Male = 1,
        Female
    }

    public class Human
    {
        public Human(Gender gender)
        {
            this.Gender = Gender;
        }

        public Gender Gender {get; set;}
    }
}
