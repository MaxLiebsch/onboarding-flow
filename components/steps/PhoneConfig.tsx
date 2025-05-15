import PhoneConfigForm from "../form/PhoneConfigForm";
import StepHeader from "../ui/StepHeader";

const PhoneConfig = () => {
  return (
    <>
      <StepHeader
        description="Konfigurieren Sie Ihr Telefonsystem"
        title="Telefonkonfiguration"
      />
      <PhoneConfigForm />
    </>
  );
};

export default PhoneConfig;
