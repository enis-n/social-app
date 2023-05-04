import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Form,
  Segment,
  Dropdown,
  Grid,
  Radio,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function JobPostForm() {
  const history = useHistory();
  const { jobStore } = useStore();
  const { createJob, updateJob, loading, loadJob, loadingInitial } = jobStore;
  const { id } = useParams<{ id: string }>();

  const jobOptions = [
    {
      key: "Front-end Dev",
      text: "Front-end Dev",
      value: "Front-end Dev",
      name: "Front-end Dev",
    },
    {
      key: "Back-end Dev",
      text: "Back-end Dev",
      value: "Back-end Dev",
      name: "Back-end Dev",
    },
    { key: "DevOps", text: "DevOps", value: "DevOps", name: "DevOps" },
  ];

  const [isRemote, setIsRemote] = useState(false);

  const [job, setJob] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    if (id) loadJob(id).then((job) => setJob(job!));
  }, [id, loadJob]);

  function handleSubmit() {
    if (job.id.length === 0) {
      let newJob = {
        ...job,
        id: uuid(),
      };
      createJob(newJob).then(() => history.push(`/jobs/${newJob.id}`));
    } else {
      updateJob(job).then(() => history.push(`/jobs/${job.id}`));
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  }

  //if (loadingInitial) return <LoadingComponent content='Loading job...' />

  return (
    <>
      <h1>Create a new Job</h1>
      <Segment clearing style={{ marginTop: 0 }}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Input
            placeholder="Job title"
            value={job.title}
            name="title"
            onChange={handleInputChange}
          />
          <Form.TextArea
            placeholder="Job description"
            value={job.description}
            name="description"
            onChange={handleInputChange}
          />
          <Grid columns={4} style={{ marginBottom: 0 }}>
            <Grid.Column width={5}>
              <Form.Input
                name="category"
                value={job.category}
                onChange={handleInputChange}
              >
                <Dropdown
                  placeholder="Select Categgory"
                  job={job.category}
                  name="category"
                  selection
                  options={jobOptions}
                />
              </Form.Input>
            </Grid.Column>
            <Grid.Column width={4}>
              <Form.Input
                type="date"
                value={job.date}
                name="date"
                onChange={handleInputChange}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Form.Input
                placeholder="Job location"
                value={job.location}
                name="location"
                disabled={isRemote}
                onChange={handleInputChange}
              />
            </Grid.Column>
            <Grid.Column width={1}>
              <Radio toggle onChange={() => setIsRemote(!isRemote)} />
              {isRemote && <p style={{ margin: 0 }}>Remote</p>}
            </Grid.Column>
          </Grid>
          <Form.Input
            placeholder="Job salary"
            value={job.salary}
            name="salary"
            onChange={handleInputChange}
          />
          <Button
            loading={loading}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />
          <Button
            as={Link}
            to="/jobs"
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </Segment>
    </>
  );
});
