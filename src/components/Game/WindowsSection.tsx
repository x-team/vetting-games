import AppWindow from "./AppWindow";
import CodeWindow from "./CodeWindow";

const WindowsSection = () => {
  return (
    <div className="flex flex-1 gap-6 overflow-auto">
      <div className="flex max-w-[472px] flex-1">
        <AppWindow />
      </div>
      <div className="flex flex-1">
        <CodeWindow />
      </div>
    </div>
  );
};

export default WindowsSection;
