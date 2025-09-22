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

                var connectionString = System.Environment.GetEnvironmentVariable(config.GetConnectionString("DefaultConnection"));
                var configure = new NHibernate.Cfg.Configuration();
                configure.Configure(Path.Combine(Directory.GetCurrentDirectory(), "DL", "hibernate.cfg.xml"));

                configure.DataBaseIntegration(db =>
                {
                    db.ConnectionString = connectionString;
                    db.Dialect<MsSql2012Dialect>();
                    db.Driver<SqlClientDriver>();
                    db.ConnectionProvider<NHibernate.Connection.DriverConnectionProvider>();
                    db.Timeout = 10;
                    db.LogSqlInConsole = true;
                    db.LogFormattedSql = true;
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
