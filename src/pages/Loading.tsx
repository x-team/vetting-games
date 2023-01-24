import Card from "@components/Surface/Card";
import BasicLayout from "@components/Layout/BasicLayout";

const LoadingPage = () => {
  return (
    <BasicLayout className="items-center justify-center">
      <Card className="w-[400px] gap-10">
        <h1 className="flex justify-center text-center text-xlarge">
          Loading...
        </h1>
      </Card>
    </BasicLayout>
  );
};

export default LoadingPage;
