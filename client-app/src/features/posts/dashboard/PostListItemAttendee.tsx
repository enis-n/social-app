import { observer } from 'mobx-react-lite'
import React from 'react'
import { Image, List } from 'semantic-ui-react'
import { Profile } from '../../../app/models/profile'
import { Link } from 'react-router-dom';

interface Props {
    attendees: Profile[];
}

export default observer(function PostListItemAttendee({ attendees }: Props) {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <List.Item key={attendee.displayName} as={Link} to={`/profiles/${attendee.username}`}>
                    <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                </List.Item>
            ))}
        </List>
    )
})
