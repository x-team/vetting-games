import Window from "@components/Navigation/Window";
import TimeTrackingControls from "@components/TimeTracking/TimeTrackingControls";
import { Item } from "react-stately";

const AppWindow = () => {
  return (
    <Window>
      <Item key="App" title="ShadowCorp: Always watching over you">
        <TimeTrackingControls bugged={false} />
      </Item>
      <Item key="BuggedApp" title="🐛 ShadowCorp: Always watching over you">
        <TimeTrackingControls bugged />
      </Item>
    </Window>
  );
};

export default AppWindow;
