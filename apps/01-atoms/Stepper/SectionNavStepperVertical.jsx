const SectionNavStepperVertical = ({children, props}) =>{
  return(
    <div className="d-flex justify-content-center bg-body rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-350px me-9">
      <div className="px-6 px-lg-10 px-xxl-5 py-10">
      { children }
      </div>
    </div>
  )
}
export default SectionNavStepperVertical;