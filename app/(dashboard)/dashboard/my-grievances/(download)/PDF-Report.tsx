"use client"
import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf"
import { TypographyH1, TypographyH4 } from '@/components/typography/typography';
import Image from 'next/image';
import logo from '@/public/logolight.png';
import cst from '@/public/cst.png';
import { Button } from '@/components/ui/button';
import { PrinterIcon } from 'lucide-react';
import GrievanceDetailCard from '@/components/grievance-display';

async function getAllGrievances() {
  const res = await fetch(`https://samchar.vercel.app/api/grievance/user`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}

function AllMyGrievances() {
  const [grievances, setGrievances] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getAllGrievances().then((data) => {
      setGrievances(data);
      setLoading(false);
    });
  }
    , []);
  return (
    <div className="space-y-3">
      {
        loading ? (
          <div className="text-center p-5 italic">
            Loading...
          </div>
        ) : (
          grievances.length > 0 ? (
            grievances.map((grievance) => (
              <GrievanceDetailCard
                key={grievance.id}
                id={grievance.id}
                title={grievance.title}
                status={grievance.status}
                grievance={grievance.description}
                posted={new Date(grievance.datePosted).toLocaleDateString()}
                category={grievance.category}
              />
            ))
          ) : (
            <div className="text-center p-5 italic">
              No grievances has been posted yet, Please post a grievance to see it here.
            </div>
          )
        )
      }
    </div>
  )
}

export default class UserExport extends Component {
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
        pdf.save("download.pdf");
      })
      ;
  }

  render() {
    return (
      <div className="w-inherit">
        <div className="mb-5">
          <Button onClick={this.printDocument} className='ml-4 flex space-x-2'>
            <PrinterIcon />
            <p>Print as PDF</p>
          </Button>
        </div>
        <div id="divToPrint" className="mt-4 w-inherit">
          <View />
        </div>
      </div>
    );
  }
}

function View() {
  return (
    <div className='border-2 border-secondary-foreground p-3'>
      <div className="flex justify-between p-10">
        <div>
          <Image src={cst} alt='logo' width={100} height={100} />
        </div>
        <div className='my-auto'>
          <TypographyH1 className='text-center font-bold'>CST Grievance System</TypographyH1>
        </div>
        <div>
          <Image src={logo} alt='logo' width={100} height={100} />
        </div>
      </div>
      <div className="p-5">
        <TypographyH4>Grievance Report as of &nbsp; {new Date().toLocaleDateString()}-{new Date().toLocaleTimeString()}</TypographyH4>
      </div>
      <AllMyGrievances />
    </div>
  )
}
