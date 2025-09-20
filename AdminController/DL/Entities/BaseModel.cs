using Microsoft.AspNetCore.Components.Web.Virtualization;

namespace AdminController.DL.Entities
{
    public class BaseModel
    {
        public virtual int Id { get; set; }
        public virtual DateTime? CreatedDate { get; set; }

        public virtual DateTime? ModifiedDate { get; set; } = DateTime.Now; 

        public virtual string? CreatedBy { get; set; }

        public virtual string? ModifiedBy { get; set; }


    }
}
