import IdentificationContainer from "@/components/layouts/IdentificationContainer"

function LoginUserLayout({children}:{children:React.ReactNode}) {
  return (
    <>
    <IdentificationContainer>
      {children}
      </IdentificationContainer>
    </>
  )
}

export default LoginUserLayout
