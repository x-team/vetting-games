import { TimeTrackingProvider } from "./lib/time-traking";
import TimeTrackingControls from "./TimeTrackingControls";

const initialTracks = JSON.parse(localStorage.getItem("tracks") || "{}");

function App() {
  return (
    <TimeTrackingProvider initialTracks={initialTracks}>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <h1 className="text-4xl mb-4">Vetting Games</h1>

        <TimeTrackingControls />
      </div>
    </TimeTrackingProvider>
  );
}

export default App;
