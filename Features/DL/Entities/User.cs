namespace Features.DL.Entities
{
    public class User
    {
        public virtual int Id { get; set; }
        public virtual string UserName { get; set; }
        public virtual string? FirstName { get; set; }
        public virtual string? LastName { get; set; }
        public virtual string? MiddleName { get; set; }
        public virtual string? Email { get; set; }
        public virtual bool Active { get; set; }
        public virtual DateTime? CreatedDate { get; set; }

        public virtual DateTime? ModifiedDate { get; set; }

        public virtual string? CreatedBy { get; set; }

        public virtual string? ModifiedBy { get; set; }

    }
}
