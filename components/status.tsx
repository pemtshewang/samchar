export default function StatusIndicator({ status }) {
  const color = status === 'Resolved' ? 'bg-green-500' : status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <>
      <div className={`rounded-full w-fit p-2 text-sm ${color} italic ml-5`} >
        {color == 'bg-red-500' ? 'Rejected' : status}
      </div>
    </>
  )
}
