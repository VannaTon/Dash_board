import Chart from "../components/Chart";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div className="min-h-screen p-5 w-full flex flex-col">
      <h1 className='my-5 ms-5 text-xl md:text-2xl font-[lusitana]'>Dashboard</h1>
      <div className="my-3 ms-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
        <DashboardCard />
      </div>
      <div className="flex-grow my-5 ms-5">
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
