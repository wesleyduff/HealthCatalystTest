﻿using Asset1.Business.Builders.PeopleBuilder;
using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;
using Asset1.PlatformClient.PeopleClient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Asset1.Business.Directors.PeopleDirector
{
    public class PeopleDirector : IPeopleDirector
    {
        private IPeopleBuilder _builder;
        private IPeopleServiceClient _client;
        private IPersonRepository _repository;

        public PeopleDirector(
            IPersonRepository repository,
            IPeopleBuilder builder,
            IPeopleServiceClient client
            )
        {
            _repository = repository;
            _builder = builder;
            _client = client;
        }

        public IEnumerable<Person> BuildPeople()
        {
            try
            {
                //check if the list of people are in the cash?

                //if cash is null or empty then query for people again
                //build peoples list

                return _builder.BuildPeople();
            }
            catch (Exception ex)
            {
                throw new Exception("There was a problem building people", ex);
            }



        }

        public Person GetPerson(int Id)
        {
            return _client.GetPersonById(Id);
        }

        public async Task<bool> SavePeopleAsync(Person person)
        {
            //check to see if the person exists...
            //if does not exist then add
            //if exists then return true... because the user is already in the DB
            // TODO
            _repository.AddPerson(person);

            return await _repository.SaveChangesAsync();
        }
    }
}
