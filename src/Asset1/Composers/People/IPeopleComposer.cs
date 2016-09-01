using Asset1.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Asset1.Composers.People
{
    public interface IPeopleComposer
    {
        JObject Compose();
    }
}
