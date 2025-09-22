namespace Features.DL
{
    public class Helper
    {
        public static DateTime? GetISTDate(DateTime? currDate)
        {
            if (currDate != null)
            {

                TimeZoneInfo istZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                DateTime istDateTime = TimeZoneInfo.ConvertTimeFromUtc((DateTime)currDate, istZone);

                return istDateTime;
            }

            return currDate;
        }
    }
}
