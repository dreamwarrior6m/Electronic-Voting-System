/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const page = () => {
  const router = useRouter();
  // const [user] = useAuthState(auth);
  // console.log({user});
  // if(!user){
  //   router.push('/login')
  // }

  const handleCreate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const OrganizatonName = form.OrganizatonName.value;
    const Type = form.Type.value;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const createVoteInfo = {OrganizatonName, Type, email, name, photo}
    console.log(OrganizatonName, Type, email, name, photo);

    try {
      const res = await fetch("http://localhost:5000/create-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createVoteInfo),
      });
      if(res?.status === 200){
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Create Vote added",
          showConfirmButton: false,
          timer: 2000,
        });
        router.push('/dashboard')
      }else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "There is a problem",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch {}
  };

  return (
    <div className="mb-36 mt-20">
      <div>
        <div className="shadow-2xl bg-base-200 rounded-lg">
          <h3 className="text-4xl font-bold text-center">EVS</h3>
          <div className="flex justify-center mx-auto"></div>
          <div className="hero">
            <div className="hero-content  ">
              <div className=" w-full   ">
                <form onSubmit={handleCreate} className="card-body">
                  <div className="grid lg:grid-cols-2 gap-2">
                    <div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-white">
                            Organization
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Organization Name"
                          className=" p-2 rounded-sm shadow-2xl border-l-8"
                          required
                          name="OrganizatonName"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-white">
                            Your E-mail
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Your Name"
                          className=" p-2 rounded-sm border-l-8"
                          required
                          name="email"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-white">
                            Your Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Your Name"
                          className=" p-2 rounded-sm border-l-8"
                          required
                          name="name"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-white">
                            Organization Logo
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Photo Link"
                          className="p-2 rounded-sm border-l-8"
                          required
                          name="photo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text text-white">
                        Organization Type
                      </span>
                    </label>
                    <select
                      className="py-2 rounded-sm shadow-2xl border-l-8 mb-2"
                      name="Type"
                      id=""
                    >
                      <option value="Organization">Administrative</option>
                      <option value="Organization">Education</option>
                      <option value="Organization">Genaral</option>
                    </select>
                  </div>
                  <div className="form-control mt-6 w-full ">
                    <button className="p-2  button text-white bg-gray-500 shadow-2xl hover:bg-slate-400 rounded-sm">
                      Submite
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
