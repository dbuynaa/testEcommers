import SearchC from 'components/header/Search';
import CheckDevice from 'modules/CheckDevice';
import Error from './_error';

const Search = () => {
  return (
    <CheckDevice Mobile={<SearchC />} Desktop={<Error statusCode={404} />} />
  );
};

export default Search;
