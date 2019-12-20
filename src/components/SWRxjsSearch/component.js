// https://medium.com/@jasbirshergill23/lets-react-with-rxjs-82d9794d76f4
// https://www.robinwieruch.de/react-rxjs-state-management-tutorial
// https://blog.bitsrc.io/sharing-data-between-react-components-using-rxjs-922a46c13dbf
import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { Subject, empty, of } from 'rxjs';
import {
  flatMap,
  map,
  distinctUntilChanged,
  filter,
  catchError,
} from 'rxjs/operators';

const makeCallStream = new Subject();
const prefButtonStream = new Subject();
const inputStream = new Subject();
const peopleStream = new Subject();
const planetStream = new Subject();
const vehicleStream = new Subject();
const getDataStream = new Subject();


const SWRxjsSearch = () => {
  const [searchText, setSearchText] = useState('');
  // eslint-disable-next-line max-len
  const [prefStatus, setPrefStatus] = useState([{ people: true }, { planets: false }, { vehicles: false }]);
  const [data, setData] = useState({
    people: { count: 0, dataArray: [] },
    vehicles: { count: 0, dataArray: [] },
    planets: { count: 0, dataArray: [] },
  });


  const initializeSearchStream = () => {
    makeCallStream
      .pipe(
        filter((val) => searchText !== ''),
        map((val) => val.value),
        flatMap((val) => {
          const arr = [];
          // eslint-disable-next-line array-callback-return
          prefStatus.map((item, index) => {
            if (item[Object.keys(item)[0]]) {
              arr.push({ pref: item, text: val });
            }
          });
          return of(arr);
        }),
      )
      .subscribe((val) => {
        // eslint-disable-next-line array-callback-return
        val.map((item, index) => {
          // eslint-disable-next-line default-case
          switch (Object.keys(item.pref)[0]) {
            case 'people':
              peopleStream.next({ searchText: item.text });
              break;
            case 'planets':
              planetStream.next({ searchText: item.text });
              break;
            case 'vehicles':
              vehicleStream.next({ searchText: item.text });
              break;
          }
        });
      });
  };

  const initializePrefButtonStream = () => {
    prefButtonStream
      .pipe(
        filter((button) => {
          let count = 0;
          button.prefStatus.map(
            // eslint-disable-next-line no-plusplus
            (item, index) => (item[Object.keys(item)[0]] ? count++ : undefined),
          );
          return count > 1 ? true : !button.status;
        }),
        filter((button) => searchText !== ''),
      )
      .subscribe((button) => {
        prefStatus[button.index][button.pref] = !prefStatus[button.index][button.pref];

        setPrefStatus(
          (pre) => ({ ...pre }),
          () => makeCallStream.next({ value: searchText }),
        );
      });
  };

  const initializeInputStream = () => {
    inputStream.subscribe((val) => {
      setSearchText(val.value);
    });
  };

  const initializeDataStreams = () => {
    peopleStream
      .pipe(map((val) => val.searchText), distinctUntilChanged())
      .subscribe((val) => {
        getDataStream.next({ searchText: val, pref: 'people' });
      });
    planetStream
      .pipe(map((val) => val.searchText), distinctUntilChanged())
      .subscribe((val) => getDataStream.next({ searchText: val, pref: 'planets' }));
    vehicleStream
      .pipe(map((val) => val.searchText), distinctUntilChanged())
      .subscribe((val) => getDataStream.next({
        searchText: val,
        pref: 'vehicles',
      }));
    getDataStream
      .pipe(
        flatMap((val) => {
          console.log('getting new data', val);
          const outVal = val;
          return fetch(
            `https://swapi.co/api/${val.pref}/?search=${val.searchText}`,
          )
            .then((vall) => vall.json())
            .then((value) => of({ pref: outVal.pref, res: value }));
        }),
        catchError((err) => empty()),
      )
      .subscribe((val) => {
        setData(
          (pre) => ({
            ...pre,
            [val.value.pref]: {
              count: val.value.res.count,
              dataArray: val.value.res.results,
            },
          }),
        );
      });
  };

  const renderButtons = (button) => (
    <Button
      variant="contained"
      color="primary"
      key={button.id}
      onClick={(e) => prefButtonStream.next({
        prefStatus,
        status: button.status,
        pref: button.name,
        searchText,
        index: button.id,
      })}
      style={{
        margin: '10px',
        ...{ background: button.status ? 'darkblue' : undefined },
      }}
    >
      {button.name}
    </Button>
  );


  useEffect(() => {
    initializeSearchStream();
    initializePrefButtonStream();
    initializeInputStream();
    initializeDataStreams();
  }, []);


  console.log(searchText, 'searchText');
  console.log(prefStatus, 'prefStatus');
  // console.log(data, 'data');
  return (
    <div style={{
      background: '#bddfea',
      borderRadius: '3px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '50px',

    }}
    >
      <div>
        {prefStatus.map((item, index) => renderButtons({
          id: index,
          name: Object.keys(item)[0],
          status: item[Object.keys(item)[0]],
        }))}
      </div>
      <div>
        <TextField
          required
          id="search"
          defaultValue="Search"
          margin="normal"
          onChange={(e) => inputStream.next({ value: e.target.value })}
        />
        <Button
          onClick={(e) => makeCallStream.next({ value: searchText })}
          style={{ margin: '10px' }}
          type="button"
          variant="contained"
          color="secondary"
        >
          search
        </Button>
      </div>
      <div>
        <h1
          style={{
            textAlign: 'center',
            border: '1px dashed gray',
            padding: '20px',
            marginTop: '36px',
            borderRadius: '4px',
          }}

        >
        Data
        </h1>
        <div style={{ flexDirection: 'row', width: '100%' }}>
          <div
            style={{
              flex: 1,
              marginLeft: 80,
              width: 300,
              display: 'inline-block',
              background: 'yellow',
            }}
          >
            <pre>
              People:
              {data.people.count}
            </pre>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {data.people.dataArray.map((item, index) => <pre key={index}>{item.name}</pre>)}
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: 80,
              width: 300,
              display: 'inline-block',
              background: 'yellow',
            }}
          >
            <pre>
              Planets:
              {data.planets.count}
            </pre>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {data.planets.dataArray.map((item, index) => <pre key={index}>{item.name}</pre>)}
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: 80,
              width: 300,
              display: 'inline-block',
              background: 'yellow',
            }}
          >
            <pre>
              Vehicles:
              {data.vehicles.count}
            </pre>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {data.vehicles.dataArray.map((item, index) => <pre key={index}>{item.name}</pre>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWRxjsSearch;
