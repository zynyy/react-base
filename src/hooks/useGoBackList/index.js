import { useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

const useGoBackList = () => {
  const matchs = useRouteMatch();
  const history = useHistory();

  const goBack = useCallback(() => {
    const { url } = matchs;

    const urlArray = url.split('/');

    const index = urlArray.findIndex((val) => val === 'new');

    const listUrl = urlArray.slice(0, index).join('/');
    history.push(listUrl);
  }, []);
  return [goBack];
};

export default useGoBackList;
