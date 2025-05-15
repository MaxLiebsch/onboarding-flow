import BasicInfoForm from "../form/BasicInfoForm";
import StepHeader from "../ui/StepHeader";

const BasicInfo = () => {
  return (
    <>
      <StepHeader
        description="Wir benötigen einige grundlegende Informationen, um Ihr Konto einzurichten"
        title="Basisdaten"
      />
      <BasicInfoForm />
    </>
  );
};

export default BasicInfo;
