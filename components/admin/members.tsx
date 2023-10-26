"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Icons } from "../icons";
import format from "date-fns/format";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

async function Member({ email, grievancesCount }: {
  email: string,
  grievancesCount: string
}) {
  const name = email.split('.cst')[0];
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={`https://source.boringavatars.com/beam/50/${name}`} alt="Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">
          {email}
        </p>
      </div>
      <div className="ml-auto font-medium flex space-x-4" title={`Posted ${grievancesCount} grievances`}><Icons.penline className="h-5 w-5" /><span>{grievancesCount}</span></div>
    </div>
  )
}

async function MemberDetailCard({ email, dateJoined, grievancesCount }: {
  email: string,
  grievancesCount: string
  dateJoined: string
}) {
  const name = email.split('.cst')[0];
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={`https://source.boringavatars.com/beam/50/${name}`} alt="Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">
          {email}&nbsp;(<i>member since &nbsp;{format(new Date(dateJoined), "dd-MM-yyyy")}</i> )
        </p>
      </div>
      <div className="ml-auto font-medium flex space-x-4" title={`Posted ${grievancesCount} grievances`}>Posted &nbsp;<Icons.penline className="h-5 w-5" /><span>{grievancesCount}{Number(grievancesCount) > 1 ? " grievances " : " grievance "}</span></div>
    </div>
  )
}
async function getUsersOnly() {
  const response = await fetch("https://samchar.vercel.app/api/admin/get-all-members");
  const data = await response.json();
  return data;
}
export function Members() {
  // request the users jere
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsersOnly().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="space-y-3">
      {
        loading ? (
          <div className="flex items-center justify-center">
            <RefreshCw className="animate-spin h-6 w-6 text-muted-foreground" />
          </div>
        ) : (
          users.map((user) => {
            return (
              <Member
                key={user.email}
                email={user.email}
                grievancesCount={user.grievances.length.toString()}
              />
            )
          })
        )
      }
    </div>
  )
}

export function DetailMembers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsersOnly().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className={"space-y-3"}>
      {
        loading ? (
          <div className="flex items-center justify-center">
            <RefreshCw className="animate-spin h-6 w-6 text-muted-foreground" />
          </div>
        ) : (
          users.map((user) => {
            return (
              <MemberDetailCard
                key={user.email}
                email={user.email}
                dateJoined={user.createdAt.toString()}
                grievancesCount={user.grievances.length.toString()}
              />
            )
          })
        )
      }
    </div>
  )
}

