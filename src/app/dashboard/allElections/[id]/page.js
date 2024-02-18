import ElectionDetails from "@/Component/Dashboard/Admin/ElectionDetails";
import AdminProtected from "@/Component/Protected/AdminProtected";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <ElectionDetails />
      </AdminProtected>
    </div>
  );
};

export default page;
