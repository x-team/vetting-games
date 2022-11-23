import { TimeTrackingProvider } from "./lib/time-tracking";
import TimeTrackingControls from "./TimeTrackingControls";

const initialTracks = JSON.parse(localStorage.getItem("tracks") || "{}");

function App() {
  return (
    <TimeTrackingProvider initialTracks={initialTracks}>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl">Vetting Games</h1>

        <TimeTrackingControls />
      </div>
    </TimeTrackingProvider>
  );
}

export default App;
