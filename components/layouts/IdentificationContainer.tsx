import "../../styles/layouts/IdentificationContainer.css";

function IdentificationContainer({children}:{children:React.ReactNode}) {
  return (
    <div id="IdentificationContainer" className="h-full flex justify-center items-center fixed z-50 w-full">
        <div id="PanelIdentification" className="py-20 px-10 text-base max-w-[90%] sm:max-w-[350px]">
      {
        children
      }
      </div>
    </div>
  )
}

export default IdentificationContainer
