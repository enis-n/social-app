import React from "react";
import { observer } from "mobx-react-lite";
import { Job } from "../../../app/models/jobs";
import { Segment, Header, Item, Button } from "semantic-ui-react";

interface Props {
  job: Job;
}
export default observer(function JobDetailedHeader({ job }: Props) {
  return (
    <>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Segment basic>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={job.title}
                    style={{ color: "white" }}
                  />
                  <p>{job.date}</p>
                  <p>
                    Hosted by <strong>Bob</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment clearing attached="bottom">
          <Button color="teal">Join Activity</Button>
          <Button>Cancel attendance</Button>
          <Button color="orange" floated="right">
            Manage Event
          </Button>
        </Segment>
      </Segment.Group>
    </>
  );
});
