import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Icons } from "../icons";
import format from "date-fns/format";
import { db } from "@/lib/db";

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
export async function Members() {
  const users = await db.user.findMany({
    where: {
      role: "User",
    },
    select: {
      createdAt: true,
      email: true,
      grievances: {
        select: {
          id: true,
        },
      },
    },
  });
  return (
    <div className="space-y-3">
      {
        users.map((user) => {
          return (
            <Member
              key={user.email}
              email={user.email}
              grievancesCount={user.grievances.length.toString()}
            />
          )
        })
      }
    </div>
  )
}

export async function DetailMembers({ className }) {
  const users = await db.user.findMany({
    where: {
      role: "User",
    },
    select: {
      createdAt: true,
      email: true,
      grievances: {
        select: {
          id: true,
        },
      },
    },
  });
  return (
    <div className={className}>
      {
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
      }
    </div>
  )
}

