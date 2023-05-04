import { makeAutoObservable, runInAction } from "mobx";
import { Job } from "../models/jobs";
import agent from "../api/agent";

export default class JobStore {
  jobRegistry = new Map<string, Job>();
  selectedJob: Job | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get jobsByDate() {
    return Array.from(this.jobRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadJobs = async () => {
    this.loadingInitial = true;
    try {
      const jobs = await agent.Jobs.list();
      jobs.forEach((job) => {
        this.setJob(job);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get groupedJobs() {
    return Object.entries(
        this.jobsByDate.reduce((jobs, job) => {
            const date = job.date;
            jobs[date] = jobs[date] ? [...jobs[date], job] : [job]
            return jobs;
        }, {} as { [key: string]: Job[] })
    )
}

  loadJob = async (id: string) => {
    let job = this.getJob(id);
    if (job) {
      this.selectedJob = job;
      return job;
    } else {
      this.loadingInitial = true;
      try {
        job = await agent.Jobs.details(id);
        this.setJob(job);
        runInAction(() => {
          this.selectedJob = job;
        });
        this.setLoadingInitial(false);
        return job;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setJob = (job: Job) => {
    job.date = job.date.split("T")[0];
    this.jobRegistry.set(job.id, job);
  };

  private getJob = (id: string) => {
    return this.jobRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createJob = async (job: Job) => {
    this.loading = true;
    try {
      await agent.Jobs.create(job);
      runInAction(() => {
        this.jobRegistry.set(job.id, job);
        this.selectedJob = job;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateJob = async (job: Job) => {
    this.loading = true;
    try {
      await agent.Jobs.update(job);
      runInAction(() => {
        this.jobRegistry.set(job.id, job);
        this.selectedJob = job;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteJob = async (id: string) => {
    this.loading = true;
    try {
      await agent.Jobs.delete(id);
      runInAction(() => {
        this.jobRegistry.delete(id);
        if (this.selectedJob?.id === id) this.cancelSelectedJob();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  setSelectedJob = (job: Job | undefined) => {
    this.selectedJob = job;
  };

  setEditMode = (state: boolean) => {
    this.editMode = state;
  };

  cancelSelectedJob = () => {
    this.selectedJob = undefined;
  };
}
