import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import JobDetailedHeader from './JobDetailedHeader';
import JobDetailedInfo from './JobDetailedInfo';

export default observer(function JobDetails() {
    const { jobStore } = useStore();
    const { selectedJob: job, loadJob, loadingInitial } = jobStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadJob(id);
    }, [id, loadJob]);

    if (loadingInitial || !job) return <LoadingComponent content={''} />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <JobDetailedHeader job={job} />
                <JobDetailedInfo job={job} />
            </Grid.Column>
        </Grid>
    )
})
