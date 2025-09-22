namespace Features.DL.Entities
{
    public class BaseModel
    {
            public virtual int Id { get; set; }
            public virtual DateTime? CreatedDate { get; set; }

            public virtual DateTime? ModifiedDate { get; set; } 

            public virtual string  CreatedBy { get; set; }

            public virtual string  ModifiedBy { get; set; }


    }
}
