import ShowElections from "@/Component/Dashboard/Admin/ShowElections";

const page = () => {
  return (
    <div>
      <div>
        <h3 className="text-3xl font-bold text-gray-700 text-center pt-2 pb-6">
          All Elections
        </h3>
      </div>
      <ShowElections />
    </div>
  );
};

export default page;
