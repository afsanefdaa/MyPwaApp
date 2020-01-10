import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LessonFour from './LessonFour';
import LessonThree from './LessonThree';
import LessonTwo from './LessonTwo';
import LessonOne from './lessonOne';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const a11yProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});


const TabPanel = (props: TabPanelProps) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const MyComponent = () => {
  const [value, setValue] = React.useState(3);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <h4>Learn RXjs</h4>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Tab label="Lesson One" {...a11yProps(0)} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Tab label="Lesson Two" {...a11yProps(1)} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Tab label="Lesson Three" {...a11yProps(2)} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Tab label="Lesson Four" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <LessonOne />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LessonTwo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LessonThree />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LessonFour />
      </TabPanel>
    </div>
  );
};

export default MyComponent;
