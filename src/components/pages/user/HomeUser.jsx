import React from "react";
import UserCourse from "./UserCourse";

function HomeUser() {
  return (
    <div className="w-screen h-screen-500 flex">
      <div className="h-screen bg-sky-200 w-3/12 ">
        <h1 className="font-semibold text-sky-600 text-center text-2xl flex mx-4">
          Our Course
        </h1>
        <h1 className="font-semibold text-black text-center text-2xl flex border-b mx-4">
          คอร์สเรียนทั้งหมด
        </h1>
        <div>
          <div className="flex justify-between m-2">
            <p>ตัวกรองคอร์สเรียน</p>
            <p>ล้างคอร์สเรียน</p>
          </div>
          <div className="flex gap-1">
            <h1 className="font-semibold text-sky-600 text-center text-2xl  mx-4">
              {" "}
              Category
            </h1>
            <h1 className="font-semibold text-black text-center text-2xl  ">
              หมวดหมู่
            </h1>
          </div>
          <label for="cars">Choose a car:</label>
          <form>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </form>
          <h1 className="font-semibold text-sky-600 text-center text-2xl  mx-4">
            {" "}
            Length
          </h1>
          <h1 className="font-semibold text-black text-center text-2xl  ">
            ความยาว
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
      <UserCourse/>
      </div>
    </div>
  );
}

export default HomeUser;
