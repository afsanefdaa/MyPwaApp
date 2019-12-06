import React, { useEffect, useState } from 'react';
import { from } from 'rxjs';
import {
  map, filter, mergeMap, delay,
} from 'rxjs/operators';


const numbersObservables = from([1, 2, 3, 4, 5, 6]);
const squareNumbers = numbersObservables.pipe(
  filter((el) => el > 2),
  mergeMap((el) => from([el]).pipe(delay(1000 * el))),
  map((el) => el * el),
);


const useObservable = (observable, setter) => {
  useEffect(() => {
    const subscription = observable.subscribe((result) => {
      setter(result);
    });


    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

const MyComponent = () => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useObservable(squareNumbers, setCurrentNumber); // change it to a hook!

  return (
    <div>
      hello rxjs
      <p>
         Current Number:
        {currentNumber}
      </p>
    </div>
  );
};

export default MyComponent;
