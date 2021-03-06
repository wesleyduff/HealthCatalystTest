﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Domain.Entities
{
    /// <summary>
    /// Each Person starts off as a Male
    /// Each Person is a super class of a human
    /// </summary>
    public class Person : Human 
    {
        /// <summary>
        /// Each person starts off as a Male. Override this if a female
        /// </summary>
        public Person() : base(Gender.Male)
        {

        }

        /// <summary>
        /// Set the first and last name on the constructor
        /// </summary>
        /// <param name="FirstName"></param>
        /// <param name="LastName"></param>
        public Person(string FirstName, string LastName) : this()
        {
            this.FirstName = FirstName;
            this.LastName = LastName;
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
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
        public int Age { get; set; }
        public Location Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<Interests> Interests { get; set; }
        public Picture Picture { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
