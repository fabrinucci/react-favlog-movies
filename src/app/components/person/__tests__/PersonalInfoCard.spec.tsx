import { render, screen } from '@testing-library/react';
import { PersonalInfoCard } from '@/components/person';
import { getPerson } from '@/lib';
import { mockedPerson } from '@/mocks/mockedResponse';

jest.mock('../../../lib', () => ({
  getPerson: jest.fn(),
}));

describe('Testing PersonalInfoCard', () => {
  it('Should be in the document', async () => {
    (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
    render(await PersonalInfoCard({ id: '105' }));

    const name = screen.getByText('Person name');
    expect(name).toBeInTheDocument();
  });
});
