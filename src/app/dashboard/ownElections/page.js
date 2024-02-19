import OwnElection from "@/Component/Dashboard/OwnElection/OwnElection";

const page = () => {
  return (
  
     <div className="mt-5">
      <div className="grid grid-cols-12 text-white font-semibold text-center">
        <p className="col-span-1">Number</p>
        <p className="col-span-3">Organization Name</p>
        <p className="col-span-3">Election Name</p>
        <p className="col-span-1">Status</p>
        <p className="col-span-2">Details</p>
        <p className="col-span-2">Actions</p>
      </div>
      <OwnElection />
    </div>
   
  );
};

export default page;
