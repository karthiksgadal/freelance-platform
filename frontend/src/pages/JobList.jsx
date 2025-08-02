import JobCard from "../components/JobCard"; // adjust path if needed

const JobList = ({ jobs, userToken }) => {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} token={userToken} />
      ))}
    </div>
  );
};
 

export default JobList;