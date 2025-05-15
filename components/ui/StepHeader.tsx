type StepHeaderProps = {
  title: string;
  description: string;
};

const StepHeader = ({ title, description }: StepHeaderProps) => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-500">{description}</p>
    </header>
  );
};

export default StepHeader;
