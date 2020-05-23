import React, { useState } from 'react';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

const LessonFour = () => {
  const [me, setMe] = useState(undefined);
  const data$ = fromFetch('https://api.github.com/search/users?q=afsanefda').pipe(
    switchMap((response) => {
      if (response.ok) {
        // OK return data
        return response.json();
      }
      // Server is returning a status requiring the client to try something else.
      return of({ error: true, message: `Error ${response.status}` });
    }),
    catchError((err) => {
      // Network or other error, handle appropriately
      console.error(err);
      return of({ error: true, message: err.message });
    }),
  );

  data$.subscribe({
    next: (result) => console.log(result),
    complete: () => console.log('done'),
  });

  return (
    <div>
      <h5>Lesson4</h5>
      <span>Description:</span>
      <p>
        Search api with Rxjs - get my github detaisl
      </p>
    </div>
  );
};

export default LessonFour;
