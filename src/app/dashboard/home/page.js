"use client";
import { FaRegCopy } from "react-icons/fa";
import img from "../../../assast/profile.png"
import Image from "next/image";
import useAuth from "@/app/hook/useAuth";


const Page = () => {
  const { user } = useAuth();
 
  // console.log(user?.email);
  const [allUser, setAlluser] = useState([]);
  const userData = `https://evs-delta.vercel.app/users`;
  useEffect(() => {
    fetch(userData)
      .then((res) => res.json())
      .then((data) => setAlluser(data));
  }, [userData]);
  // console.log(allUser)

  const User = allUser?.filter((users) => users?.email === user?.email);
  // console.log(User?.[0]?.idNumber);

  // update profile
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const name = form.name.value;
    const alldata = { name, date };
    console.log(alldata);

    fetch(`http://localhost:5000/users/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(alldata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal("Thank You", "Update Successfully", "success");
        }
      });
  };

 
  return (
    <div className="bg-lime-500">
      <div className="  ">
        <div className="card w-full h-full  shadow-xl image-full ">
          <div className="flex gap-5 items-center card-body ">
            <Image
              className="w-[150px] h-[150px] rounded-full border-4 border-red-200"
              src={user?.photoURL ? user?.photoURL : img}
              width={500}
              height={500}
              alt="profile"
            ></Image>
            <div className="flex gap-2 items-center">
 
              <p>{User?.[0]?.idNumber}</p>  <FaRegCopy />
 
            </div>

            {user && (
              <h1 className="text-5xl text-white font-semibold">
                {user?.displayName}
              </h1>
            )}

            <hr />
            <div className="">
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-xl font-bold">Full Name</h2>
                  <p>Chandon Kumar Mundol</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Email</h2>
                  <p>chandonkuma2023@gmail.com</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Date Of Birdth</h2>
 
                  <p className="">{User?.[0]?.date}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold">ID Number</h2>
                  <p>{User?.[0]?.idNumber}</p>
 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
