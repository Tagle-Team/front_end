import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import routes from 'resources/routes';

export default function Root() {
  const history = useHistory();
  useEffect(() => {
    history.replace(routes.tag);
  }, [history]);

  return <></>;
}
