import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/config';
import { formatStrings, transformToSlug } from '@/utils';
import type { MovieCast, MovieCrewFiltered } from '@/interfaces';

interface Props {
  profiles: MovieCast[] | MovieCrewFiltered[];
}

const { MOVIE_PATH_SMALL, FEMALE_NOT_FOUND, MALE_NOT_FOUND } = config;

export function MovieProfiles({ profiles }: Props) {
  return (
    <ul data-testid='MovieProfiles' className='flex flex-col gap-y-3'>
      {profiles.map((profile) => (
        <li
          data-testid='MovieProfiles-li'
          className='flex animate-fadeIn items-center gap-4'
          key={profile.id}
        >
          <Link
            data-testid='MovieProfiles-img-link'
            href={`/person/${profile.id}-${transformToSlug(profile.name)}`}
          >
            <figure className='my-2 h-32 w-24 rounded-md bg-purple-400'>
              <Image
                data-testid='MovieProfiles-img'
                className='h-32 w-24 rounded-md object-cover'
                src={
                  profile.profile_path
                    ? `${MOVIE_PATH_SMALL}${profile.profile_path}`
                    : profile.gender === 1
                    ? FEMALE_NOT_FOUND
                    : MALE_NOT_FOUND
                }
                alt={profile.name}
                height={100}
                width={100}
              />
            </figure>
          </Link>

          <div>
            <Link
              data-testid='MovieProfiles-name-link'
              href={`/person/${profile.id}-${transformToSlug(profile.name)}`}
            >
              <h4
                data-testid='MovieProfiles-name'
                className='mb-1 font-semibold transition-colors md:hover:text-violet-300'
              >
                {profile.name}
              </h4>
            </Link>
            <h5
              data-testid={`MovieProfiles-${
                ('character' in profile && 'character') ||
                ('job' in profile && 'job')
              }`}
              className='text-sm text-purple-200'
            >
              {'character' in profile && profile.character}
              {'job' in profile && formatStrings(profile.job)}
            </h5>
          </div>
        </li>
      ))}
    </ul>
  );
}
