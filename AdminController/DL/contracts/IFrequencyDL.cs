using AdminController.DL.Entities;

namespace AdminController.DL.contracts
{
    public interface IFrequencyDL
    {

        List<Frequency> GetFrequencies();
        Frequency GetFrequencyById(int id);

        int AddFrequency(Frequency frequency);

        Frequency UpdateFrequency(Frequency frequency);

        Frequency DeleteFrequency(int id);
    }
}
