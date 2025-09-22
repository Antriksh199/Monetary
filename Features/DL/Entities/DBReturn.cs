namespace Features.DL.Entities
{
    public class Error()
    {
        public virtual string ErrorId { get; set; } = String.Empty;
        public virtual string ErrorMsg { get; set; } = String.Empty;

        public virtual string InnerException { get; set; } = String.Empty;
    }
    public class DBReturn : Error
    {
        public virtual object result { get; set; }

        public virtual string status { get; set; }

    }
}
