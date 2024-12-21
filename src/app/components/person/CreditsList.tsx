import type {
  CreditCast,
  CreditCrew,
  CreditCrewFiltered,
  PersonCredits,
} from '@/interfaces';
import { groupCrewJobs, sortMovies } from '@/utils';
import { CreditsMovieList } from './CreditsMovieList';

interface Props {
  credits: PersonCredits;
  knownFor: string;
}

export function CreditsList({ credits, knownFor }: Props) {
  const { cast, crew } = credits;

  const sortedMoviesCast = sortMovies(cast) as CreditCast[];
  const sortedMoviesCrew = sortMovies(crew) as CreditCrew[];

  const filteredCreditsCrew = groupCrewJobs(
    sortedMoviesCrew
  ) as CreditCrewFiltered[];

  return (
    <div
      data-testid='CreditsList'
      className={`flex ${
        knownFor === 'Acting' ? 'flex-col' : 'flex-col-reverse'
      } gap-10`}
    >
      {cast.length > 0 && (
        <CreditsMovieList creditsList={sortedMoviesCast} type='Acting' />
      )}

      {crew.length > 0 && (
        <CreditsMovieList creditsList={filteredCreditsCrew} type='Crew' />
      )}
    </div>
  );
}
