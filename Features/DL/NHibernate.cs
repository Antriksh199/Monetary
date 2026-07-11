using System.Configuration;
using System.Reflection;

using Features.DL.Implementation;

using NHibernate;
using NHibernate.Cfg;
using NHibernate.Dialect;
using NHibernate.Driver;
namespace Features.DL
{
   public class NHibernateHelper
        {
            private static ISessionFactory sessionFactory;
            private readonly IConfiguration _config;

            public NHibernateHelper(IConfiguration conf)
            {
                _config = conf;
            }
        public static void Initialize(IConfiguration config)
        {
            if (sessionFactory != null) return;

            var dbHost = config["DB_HOST"];
            var port = config["PORT"];
            var db = config["DATABASE"];
            var dbUser = config["USER_ID"];
            var dbPassword = config["Password"];

            var connectionString = String.Format("Host={0};Port={1};Database={2};Username={3};Password={4};Ssl Mode=Disable;", dbHost, port, db, dbUser, dbPassword);

            var configure = new NHibernate.Cfg.Configuration();
            configure.Configure(Path.Combine(Directory.GetCurrentDirectory(), "DL", "hibernate.cfg.xml"));

            configure.DataBaseIntegration(dbConfig =>
            {
                dbConfig.ConnectionString = connectionString;
                dbConfig.Dialect<PostgreSQLDialect>();
                dbConfig.Driver<NpgsqlDriver>();
                dbConfig.ConnectionProvider<NHibernate.Connection.DriverConnectionProvider>();
                dbConfig.Timeout = 10;
                dbConfig.LogSqlInConsole = true;
                dbConfig.LogFormattedSql = true;
            });

            configure.AddAssembly(Assembly.GetExecutingAssembly());
            sessionFactory = configure.BuildSessionFactory();
        }
        public static NHibernate.ISession OpenSession()
            {
                if (sessionFactory == null)
                    throw new InvalidOperationException("NHibernate not initialized. Call Initialize() first.");

                return sessionFactory.OpenSession();
            }
        }
    }
