import ElectionDetails from "@/Component/Dashboard/Admin/ElectionDetails";
import ModaProtected from "@/Component/Protected/ModaProtected";

const page = () => {
  return (
    <div>
      <ModaProtected>
        <ElectionDetails />
      </ModaProtected>
    </div>
  );
};

export default page;
