import { render, screen } from '@testing-library/react';
import { PersonMain } from '@/components/person';
import { getPerson, getPersonCredits } from '@/lib';
import { mockedPerson, mockedPersonCredits } from '@/mocks/mockedResponse';

jest.mock('../../../lib', () => ({
  getPerson: jest.fn(),
  getPersonCredits: jest.fn(),
}));

describe('Testing PersonalInfoCard', () => {
  it('Should be in the document', async () => {
    (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
    (getPersonCredits as jest.Mock).mockResolvedValue(mockedPersonCredits);

    render(await PersonMain({ id: '4' }));

    const name = screen.getByText('Person name');
    expect(name).toBeInTheDocument();
  });
});
