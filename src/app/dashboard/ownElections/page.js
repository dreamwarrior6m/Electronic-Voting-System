import OwnElection from "@/Component/Dashboard/OwnElection/OwnElection";


const page = () => {
  return (
    <div>
      <div>
          <h3 className="text-3xl font-bold text-gray-700 text-center pt-2 pb-6">
            My Elections
          </h3>
        </div>
        <OwnElection />
    </div>
  );
};

export default page;
