"use client"
import { CartesianGrid, Tooltip, AreaChart, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Area } from 'recharts';
import { useEffect, useState } from 'react';
import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf"
import { TypographyH1, TypographyH4 } from '@/components/typography/typography';
import Image from 'next/image';
import logo from '@/public/logolight.png';
import cst from '@/public/cst.png';
import { Button } from '@/components/ui/button';
import { PrinterIcon } from 'lucide-react';

export default class Export extends Component {
  constructor(props) {
    super(props);
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        // make sure the width and height of the image is reflecting the one of the canvas we see all the width graphs
        const fullWidth = pdf.internal.pageSize.getWidth();
        const fullHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 0, 0, fullWidth, fullHeight);
        // pdf.output('dataurlnewwindow');
        pdf.save("report.pdf");
      })
      ;
  }

  render() {
    return (
      <div className="w-inherit">
        <div className="p-5">
          <div className="mb-5">
            <Button onClick={this.printDocument} className='ml-4 flex space-x-2'>
              <PrinterIcon />
              <p>
                Print as PDF
              </p>
            </Button>
          </div>
          <div id="divToPrint" className="mt-4 w-inherit">
            <AdminChart />
          </div>
        </div>
      </div>);
  }
}

async function getGrievances() {
  const res = await fetch('https://samchar.vercel.app/api/admin/chart', {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

function AdminChart() {
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
    <div>
      <header className="flex justify-between p-10">
        <div>
          <Image src={cst} alt='logo' width={100} height={100} />
        </div>
        <div className='my-auto'>
          <TypographyH1 className='text-center font-bold'>CST Grievance System</TypographyH1>
        </div>
        <div>
          <Image src={logo} alt='logo' width={100} height={100} />
        </div>
      </header>
      <div className="p-5">
        <TypographyH4>Grievance Report as of &nbsp; {new Date().toLocaleDateString()}-{new Date().toLocaleTimeString()}</TypographyH4>
      </div>
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
      <footer className="border-t border-black">
        <p className="font-bold indent-2 p-4">
          &copy; 2021 Grievance Redressal System | grievances.cst.edu.bt
        </p>
      </footer>
    </div>
  );
}

