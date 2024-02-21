import NavCompact from "@/components/layouts/NavCompact"
import NavComponent from "@/components/layouts/NavComponent"


function NotebooksLayout({children}: {
    children: React.ReactNode
  }) {
  return (
    <div className="flex flex-col sm:flex-row h-full">
    <NavCompact />
    <NavComponent />
    <div className=" w-full">
      {children}
    </div>
    </div>
  )
}

export default NotebooksLayout
