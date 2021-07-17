import {
  VStack,
  Input,
  Button,
  FormControl,
  ScrollView,
  CheckIcon,
  Select,
  Center,
  Heading,
  NativeBaseProvider,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {Formik} from 'formik';
import DatePicker from 'react-native-date-picker';

import Loader from '../Loader';

import {storeToDo} from './service';

interface todoProps {
  id?: string;
  type?: string;
  title?: string;
  desp?: string;
  dateTime?: Date;
  reminders?: Date;
  status?: 'ongoing' | 'completed' | 'passed';
}

type AddToDoParamList = {
  AddToDo: {} | undefined;
  DisplayToDo: {} | undefined;
};

type AddToDoNavigationProp = BottomTabNavigationProp<
  AddToDoParamList,
  'AddToDo'
>;

interface todoFormProps extends todoProps {
  onSubmitRoute?: 'DisplayToDo' | 'AddToDo';
  navigation: AddToDoNavigationProp;
}

interface validateProps {
  id?: string;
  type?: string;
  title?: string;
  desp?: string;
  dateTime?: Date;
  reminders?: Date;
  status?: 'ongoing' | 'completed' | 'passed';
}

interface errorProps {
  title?: string;
  desp?: string;
  dateTime?: string;
  reminders?: string;
}

interface submitProps {
  id: string;
  type: string;
  title: string;
  desp: string;
  dateTime: Date;
  reminders: Date;
  status: 'ongoing' | 'completed' | 'passed';
}

const dateDiff = (d1: Date, d2: Date) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

const validate = (values: validateProps) => {
  const errors: errorProps = {};

  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.desp) {
    errors.desp = 'Required';
  }
  if (values.dateTime != null) {
    const diff = dateDiff(new Date(), values.dateTime);
    if (diff <= 0) errors.dateTime = 'Select Correct Date';

    if (values.reminders != null) {
      const diff = dateDiff(values.reminders, values.dateTime);
      if (diff <= 0) errors.reminders = 'Select Correct Date';
    }
  }

  return errors;
};

function ToDoForm({
  id,
  type,
  title,
  desp,
  dateTime,
  reminders,
  status,
  onSubmitRoute = 'DisplayToDo',
  navigation,
}: todoFormProps) {
  const [submissionState, setSubmissionState] = useState(false);

  const [submissionMsg, setSubmissionMsg] = useState<string>('');

  const onSubmit = (data: submitProps) => {
    setSubmissionState(true);
    storeToDo(data).then(res => {
      if (res) {
        setSubmissionMsg(id ? 'ToDo Updated' : 'ToDo Added');
        setTimeout(() => {
          if (onSubmitRoute) {
            setSubmissionState(false);
            navigation.navigate(onSubmitRoute);
          } else {
            setSubmissionState(false);
          }
        }, 5000);
      } else {
        setSubmissionMsg('Something Went Wrong');
        setTimeout(() => {
          setSubmissionState(false);
        }, 5000);
      }
    });
  };

  const init = {
    id: id || '',
    type: type || '',
    title: title || '',
    desp: desp || '',
    dateTime: dateTime || new Date(),
    reminders: reminders || new Date(),
    status: status || 'ongoing',
  };

  useEffect(() => {}, []);

  return (
    <>
      {submissionState && (
        <Center flex={1}>
          <VStack space={4} alignItems="center" justifyContent="center">
            <Loader />
            <Heading>{submissionMsg}</Heading>
          </VStack>
        </Center>
      )}

      {!submissionState && (
        <ScrollView flex={1}>
          <Formik
            initialValues={{...init}}
            onSubmit={onSubmit}
            validate={validate}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => (
              <VStack width="100%" space={4} p={4}>
                <FormControl isRequired isInvalid={'type' in errors}>
                  <FormControl.Label>Type</FormControl.Label>
                  {console.log('errors', errors)}
                  <Input
                    onBlur={handleBlur('type')}
                    placeholder="work"
                    onChangeText={handleChange('type')}
                    value={values.type}
                  />
                  <FormControl.ErrorMessage>
                    {errors.type}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'title' in errors}>
                  <FormControl.Label>Title</FormControl.Label>
                  <Input
                    onBlur={handleBlur('title')}
                    placeholder="Study"
                    onChangeText={handleChange('title')}
                    value={values.title}
                  />
                  <FormControl.ErrorMessage>
                    {errors.title}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={'dateTime' in errors}>
                  <FormControl.Label>Date and Time</FormControl.Label>
                  <DatePicker
                    date={values.dateTime}
                    onDateChange={newdate => setFieldValue('dateTime', newdate)}
                  />
                  <FormControl.ErrorMessage>
                    {errors.desp}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'desp' in errors}>
                  <FormControl.Label>Description</FormControl.Label>
                  <Input
                    onBlur={handleBlur('desp')}
                    placeholder="to pass"
                    onChangeText={handleChange('desp')}
                    value={values.desp}
                  />
                  <FormControl.ErrorMessage>
                    {errors.desp}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'reminders' in errors}>
                  <FormControl.Label>Reminders</FormControl.Label>
                  <DatePicker
                    date={values.reminders}
                    onDateChange={newdate =>
                      setFieldValue('reminders', newdate)
                    }
                  />
                  <FormControl.ErrorMessage>
                    {errors.title}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'status' in errors}>
                  <FormControl.Label>Status</FormControl.Label>
                  <Select
                    selectedValue={values.status}
                    minWidth={200}
                    accessibilityLabel="ToDo status"
                    placeholder="Status"
                    onValueChange={handleChange('status')}
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt={1}>
                    <Select.Item label="Ongoing" value="ongoing" />
                    <Select.Item label="Completed" value="completed" />
                    <Select.Item label="Passed" value="passed" />
                  </Select>
                  <FormControl.ErrorMessage>
                    {errors.status}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button onPress={() => handleSubmit()}>
                  {id ? 'Update ToDo' : 'Submit ToDo'}
                </Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      )}
    </>
  );
}

export default ToDoForm;
