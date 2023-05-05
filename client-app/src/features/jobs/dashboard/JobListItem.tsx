import React from "react";
import { Job } from "../../../app/models/jobs";
import { observer } from "mobx-react-lite";
import { Icon, Item, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
interface Props {
  job: Job;
}
export default function PostListItem({ job }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/jobs/${job.id}`}>
                {job.title}
              </Item.Header>
              <Item.Description>{job.company}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          posted on: {job.date}
          <br />
          <Icon name="marker" />
          Location: {job.location}
        </span>
      </Segment>
      <Segment clearing>
        <span>{job.description}</span>
        <Button
          as={Link}
          to={`/jobs/${job.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
