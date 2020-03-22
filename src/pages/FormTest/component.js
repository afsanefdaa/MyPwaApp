import React, { useState } from 'react';
import {
  Container, Input, TextField, Button, Select, MenuItem, FormControl, InputLabel,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import Joi from '@hapi/joi';
import ReactJson from 'react-json-view';
import { v4 as uuidv4 } from 'uuid';

const YupSchema = yup.object().shape({
  'first-name': yup.string().required('This is required!'),
  'last-name': yup.string().required('This is required!'),
  gender: yup.string().required('This is required!'),
  age: yup.number().required('This is required!'),
});

// eslint-disable-next-line no-unused-vars
const JoiSchema = Joi.object({
  'first-name': Joi.string().required().label('This is required!'),
  'last-name': Joi.string().required().label('This is required!'),
  gender: Joi.string().required().label('This is required!'),
  age: Joi
    .number()
    .min(18)
    .required()
    .label('above 18! required'),
});

const FormTest = () => {
  const [users, setUsers] = useState([]);
  const defaultValue = {
    'first-name': '', 'last-name': '', gender: '', age: undefined,
  };

  const {
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    formState,
    // register,
    setValue,
    // setError,
    // clearError,
    // triggerValidation,
    // getValues,
  } = useForm({
    validationSchema: YupSchema,
  });
  useForm({ defaultValue });

  const onSubmit = (data) => {
    console.log(formState.isValid, 'isvalid');
    setUsers((prevState) => [...prevState, data]);
    reset(defaultValue);
  };

  console.log(users);

  return (
    <Container style={{ background: 'lightgray', borderRadius: '4px', marginTop: '30px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1, marginTop: '30px',
        }}
        >
          <span>Watch</span>
          <ReactJson src={{
            'first-name': watch('first-name') || '',
            'last-name': watch('last-name') || '',
            gender: watch('gender') || '',
            age: watch('age') || 0,
          }}
          />
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1, marginTop: '30px',
        }}
        >
          <span>Errors</span>
          <ReactJson src={errors} />
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1, marginTop: '30px',
        }}
        >
          <span>Form State</span>
          <ReactJson src={{
            isSubmitted: formState.isSubmitted,
            submitCount: formState.submitCount,
            dirty: formState.dirty,
            isValid: formState.isValid,
            dirtyFields: formState.dirtyFields,
            touched: formState.touched,
          }}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
        <Controller
          as={Input}
          name="first-name"
          control={control}
          defaultValue=""
          placeholder="your first name"
          style={{ margin: '10px 0' }}
        />
        <Controller
          as={Input}
          name="last-name"
          control={control}
          defaultValue=""
          placeholder="your last name"
          style={{ margin: '10px 0' }}
        />
        <Controller
          as={(
            <TextField
              id="filled-number"
              label="Age"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          )}
          name="age"
          control={control}
          defaultValue=""
          style={{ margin: '10px 0' }}
        />
        <Controller
          as={(
            <FormControl>
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Gender
              </InputLabel>
              <Select labelId="demo-simple-select-placeholder-label-label" onChange={(e) => setValue('gender', e.target.value)}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
          )}
          name="gender"
          control={control}
          style={{ margin: '10px 0' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ margin: '10px 0' }}
        >
          Submit
        </Button>
      </form>
      <div>
        {
          users.map((el) => <h3 key={uuidv4()}><ReactJson src={el} /></h3>)
        }
      </div>
    </Container>
  );
};

export default FormTest;
