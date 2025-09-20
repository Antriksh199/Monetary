using System.Threading.Tasks;

using AdminController.DL.Entities;

namespace AdminController.BL.Contracts
{
    public interface IFrequencyBL
    {
        List<Frequency> GetFrequencies();
        Frequency GetFrequencyById(int Id);
        int AddFrequency(Frequency frequency);
        Frequency UpdateFrequency(Frequency frequency);
        Frequency DeleteFrequency(int id);
    }
}
