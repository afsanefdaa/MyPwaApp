import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';


const source = ['I', 'Definitely', 'Am', 'About', 'Learning', 'Rxjs'];
const names$ = interval(1000).pipe(map((el) => source.slice(0, el + 1)));


const useObservable = (observable) => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};

const LessonTwo = () => {
  const names = useObservable(names$);


  return (
    <div>
      <h5>Lesson2</h5>
      <span>Description:</span>
      <p>
        With an array it shows a list with delay!
      </p>
      <List items={names} />
    </div>
  );
};

const List = ({ items = [], loading = false }) => (
  <ul
    style={{
      background: 'pink', padding: '20px', borderRadius: '4px',
    }}
    className={loading ? 'loading' : null}
  >
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

List.propTypes = {
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LessonTwo;
