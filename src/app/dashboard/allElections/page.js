import ShowElections from "@/Component/Dashboard/Admin/ShowElections";

const page = () => {
  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold text-gray-700 text-center pt-3 pb-8">
          All Elections
        </h3>
      </div>
      <ShowElections />
    </div>
  );
};

export default page;
