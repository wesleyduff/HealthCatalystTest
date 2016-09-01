namespace Asset1.Domain.Entities
{
    public class Location
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public States State { get; set; }
        public string PostalCode { get; set; }
    }
}