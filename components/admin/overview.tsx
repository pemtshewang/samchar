"use client"
import { CartesianGrid, Tooltip, AreaChart, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Area, Label } from 'recharts';
import { useEffect, useState } from 'react';

async function getGrievances() {
  const res = await fetch('https://samchar.vercel.app/api/admin/chart', {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default function AdminChart() {

  const [data, setData] = useState({
    monthlyGrievances: [],
    grievancesByCategory: [],
    grievancesByStatus: [],
  });

  useEffect(() => {
    getGrievances().then((data) => {
      setData({
        monthlyGrievances: data.monthlyGrievances,
        grievancesByCategory: data.grievancesByCategory,
        grievancesByStatus: data.grievancesByStatus,
      });
    });
  }, []);

  // Monthly Grievances Chart
  const groupedData = data.monthlyGrievances.map(([month, count]) => ({ month, count }));

  // Grievances by Category Chart
  const grievancesByCategoryData = data.grievancesByCategory.map((grievance) => ({
    category: grievance.category,
    count: grievance._count._all,
  }));

  // Grievances by Status Chart
  const grievancesByStatusData = data.grievancesByStatus.map((grievance) => ({
    status: grievance.status,
    count: grievance._count._all,
  }));

  return (
    <>
      <div className='p-5'>
        <p className="font-bold indent-2 p-2">
          Grievances posted per day
        </p>
        <ResponsiveContainer width="100%" height={350} >
          <AreaChart width={730} height={250} data={groupedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="p-5">
        <p className="font-bold indent-2 p-2">
          Grievances sorted by category
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={grievancesByCategoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="count" fill="#882458" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-5">
        <p className="font-bold indent-2 p-2">
          Grievances sorted by status
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={grievancesByStatusData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Bar dataKey="count" fill="#1215c8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

