import ShowElections from "@/Component/Dashboard/Admin/ShowElections";
import AdminProtected from "@/Component/Protected/AdminProtected";

const page = () => {
  return (
    <AdminProtected>
      <div className="mt-5">
        <div className="grid grid-cols-12 text-white font-semibold text-center">
          <p className="col-span-1">Number</p>
          <p className="col-span-4">Organization Name</p>
          <p className="col-span-3">Election Name</p>
          <p className="col-span-1">Status</p>
          <p className="col-span-2">Details</p>
          <p className="col-span-1">Action</p>
        </div>
        <ShowElections />
      </div>
    </AdminProtected>
  );
};

export default page;
