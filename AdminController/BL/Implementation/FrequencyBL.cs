using System.Threading.Tasks;

using AdminController.BL.Contracts;
using AdminController.DL.Entities;
using AdminController.DL.Implementation;
using AdminController.DL.contracts;
using Microsoft.Extensions.Configuration;

namespace AdminController.BL.Implementation
{
    public class FrequencyBL : IFrequencyBL
    {
        public IConfiguration _configuration;

        public IFrequencyDL _FrequencyDL;

        public FrequencyBL(IFrequencyDL fDL, IConfiguration Configuration)
        {
            _configuration = Configuration;
            _FrequencyDL = fDL;
        }

        public List<Frequency> GetFrequencies()
        {
            return _FrequencyDL.GetFrequencies();
        }

        public Frequency GetFrequencyById(int id)
        {
            return _FrequencyDL.GetFrequencyById(id);
        }

        public int AddFrequency(Frequency frequency)
        {
            int id = _FrequencyDL.AddFrequency(frequency);
            return id;
        }

        public Frequency UpdateFrequency(Frequency frequency)
        {
            FrequencyDL dL = new FrequencyDL();
            return dL.UpdateFrequency(frequency);
        }

        public Frequency DeleteFrequency(int id)
        {
            return _FrequencyDL.DeleteFrequency(id);
        }

    }
}
