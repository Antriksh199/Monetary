namespace AdminController.DL
{
    public class Helper
    {
        public static DateTime? GetISTDate(DateTime? currDate)
        {
            if (currDate != null)
            {
                DateTime utcDateTime = DateTime.SpecifyKind(currDate.Value, DateTimeKind.Utc);
                TimeZoneInfo istZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                DateTime istDateTime = TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, istZone);

                return istDateTime;
            }

            return currDate;
        }
    }
}
