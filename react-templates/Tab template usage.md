jsx
```
 <Tabs defaultValue='editStudent'>
        {/* Tab headers */}
        <TabList>
          <Tab value='editStudent'>Edit Student</Tab>
          <Tab value='applications'>Applications</Tab>
          <Tab value='courses'>Courses</Tab>
          <Tab value='actions'>Actions</Tab>
        </TabList>

        {/* Tab panels */}
        <TabPanel value='editStudent'>
          <EditStudent />
        </TabPanel>
        <TabPanel value='applications'>
          <Applications />
        </TabPanel>
        <TabPanel value='courses'>
          <Courses />
        </TabPanel>
        <TabPanel value='actions'>
          <div className='text-gray-600 italic'>⚡ Actions coming soon...</div>
        </TabPanel>
      </Tabs>
```