import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function SubjectFavCard() {
  return (
    <React.Fragment>
      <Title>Forums et sujets favoris</Title>
      <Typography sx={{ flex: 1, alignSelf: 'flex-start' }} component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondsary" sx={{ flex: 1, alignSelf: 'flex-start' }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}