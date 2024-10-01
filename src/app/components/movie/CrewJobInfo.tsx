import React from 'react';
import Link from 'next/link';
import { MovieCrewFiltered } from '@/interfaces';
import { formatStrings, transformToSlug } from '@/utils';

interface Props {
  crew: MovieCrewFiltered[];
  excludeJobs?: string[];
}

export const CrewJobInfo = ({ crew, excludeJobs }: Props) => {
  return (
    <>
      {crew.map((crewPerson) => {
        if (crewPerson.job.some((j) => excludeJobs?.includes(j))) return;
        return (
          <div key={crewPerson.id}>
            <Link
              href={`/person/${crewPerson.id}-${transformToSlug(
                crewPerson.name
              )}`}
            >
              <h3 className='inline text-base font-semibold transition-colors md:hover:text-violet-300'>
                {crewPerson.name}
              </h3>
            </Link>
            <h4 className='text-sm text-purple-200'>
              {formatStrings(crewPerson.job)}
            </h4>
          </div>
        );
      })}
    </>
  );
};
