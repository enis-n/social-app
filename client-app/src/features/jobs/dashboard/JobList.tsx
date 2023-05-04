import React, { Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import JobListItem from "./JobListItem";
import { Header } from "semantic-ui-react";

export default observer(function JobList() {
  // const { jobStore } = useStore();
  // const { groupedJobs } = jobStore;

  // Sample job object
  const sampleJob = {
    id: "1",
    title: "Software Engineer",
    description: "random desc",
    category: "developer",
    date: "2023-05-01",
    location: "New York",
    salary: "600eur",
  };

  // Array of job objects
  const jobArray = [
    sampleJob,
    {
      id: "2",
      title: "UX Designer",
      company: "XYZ Inc.",
      category: "asd",
      salary: "345",
      date: "2023-04-25",
      location: "San Francisco",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
    },
    {
      id: "3",
      title: "Marketing Manager",
      company: "PQR Inc.",
      category: "asd",
      salary: "345",
      date: "2023-04-30",
      location: "London",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
    },
  ];
  return (
    // <>
    //   {groupedJobs.map(([group, jobs]) => (
    //     <Fragment key={group}>
    //       <Header sub color="teal">
    //         {group}
    //       </Header>
    //       {jobs.map((job) => (
    //         <JobListItem key={job.id} job={job} />
    //       ))}
    //     </Fragment>
    //   ))}
    // </>
    <>
      {jobArray.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </>
  );
});
