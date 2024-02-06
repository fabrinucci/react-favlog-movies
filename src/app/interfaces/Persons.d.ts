export interface Person {
  adult:                boolean
  also_known_as:        string[]
  biography:            string
  birthday:             string | null
  deathday:             string | null
  gender:               number  
  homepage:             string | null
  id:                   number
  imdb_id:              string | null
  known_for_department: string
  name:                 string
  place_of_birth:       string | null
  popularity:           number
  profile_path:         string | null
}

export interface PersonCredits {
  cast: CreditCast[];
  crew: CreditCrew[];
  id:   number;
}

export interface CreditCast {
  adult:             boolean;
  backdrop_path:     null | string;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       null | string;
  release_date:      string;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
  character:         string;
  credit_id:         string;
  order:             number;
}

export interface CreditCrew extends Omit<CreditCast, 'character' | 'order'> {
  department: string;
  job:        string   
}

export interface CreditCrewFiltered extends CreditCrew {
  job: string[]   
}
