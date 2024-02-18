import ShowElections from "@/Component/Dashboard/Admin/ShowElections";

const page = () => {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-12 text-white font-semibold text-center">
        <p className="col-span-2">Number</p>
        <p className="col-span-2">Organization Name</p>
        <p className="col-span-2">Election Name</p>
        <p className="col-span-2">current Status</p>
        <p className="col-span-2">More Details</p>
        <p className="col-span-2">Perform Actions</p>
      </div>
      <ShowElections />
    </div>
  );
};

export default page;
