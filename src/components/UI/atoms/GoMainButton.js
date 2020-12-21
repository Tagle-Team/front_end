import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import routes from 'resources/routes';

/**
 * 메인으로 가는 버튼
 */
function GoMainButton() {
  const history = useHistory();

  const handleGoMain = () => {
    history.push(routes.tag);
  };

  return (
    <Button variant="contained" size="large" onClick={handleGoMain}>
      Main
    </Button>
  );
}

export default GoMainButton;
