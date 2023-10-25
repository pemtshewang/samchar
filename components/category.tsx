export default function CategoryUI({ category }) {
  return (
    <div className="w-fit p-2 text-sm text-muted-foreground border border-dotted rounded bg-slate-300 dark:bg-primary-foreground ml-5">
      Category: {category}
    </div>
  )
}
