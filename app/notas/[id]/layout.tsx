

function NoteLayout({children}: {
    children: React.ReactNode
  }) {
  return (
    <div className="flex flex-col sm:flex-row w-full h-fit gap-2 sm:gap-0 justify-center items-center sm:items-start pt-4">
      {children}
    </div>
  )
}

export default NoteLayout
