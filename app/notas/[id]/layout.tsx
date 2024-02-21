import NavCompact from "@/components/layouts/NavCompact"
import NavComponent from "@/components/layouts/NavComponent"


function NoteLayout({children}: {
    children: React.ReactNode
  }) {
  return (
    <div className="flex flex-col sm:flex-row h-full">
    <NavCompact />
    <NavComponent />
    <div className="flex flex-col sm:flex-row w-full h-fit gap-2 sm:gap-0 justify-center items-center sm:items-start pt-4">
      {children}
    </div>
      </div>
  )
}

export default NoteLayout
