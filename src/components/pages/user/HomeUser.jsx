import React, { useState } from "react";
import UserCourse from "./UserCourse";

function HomeUser() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  
  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedLength('');
  };

  return (
    <div className="w-screen flex">
      <div className="h-screen bg-sky-100 w-3/12 p-4">
        <div className="flex justify-center mb-2">
          <h1 className="font-semibold text-sky-600 text-2xl mr-2">
            Our Course
          </h1>
          <h1 className="font-semibold text-black text-2xl">
            คอร์สเรียนทั้งหมด
          </h1>
        </div>
        
        <div className="border-b pb-2 mb-4"></div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium">ตัวกรองคอร์สเรียน</p>
            <button 
              onClick={handleClearFilters}
              className="text-sky-600 text-sm hover:underline"
            >
              ล้างตัวกรอง
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h2 className="font-semibold text-sky-600 mr-2">Category</h2>
              <h2 className="font-semibold">หมวดหมู่</h2>
            </div>
            <select 
              className="w-full p-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">ทั้งหมด</option>
              <option value="เว็บไซต์">เว็บไซต์</option>
              <option value="โปรแกรมมิ่ง">โปรแกรมมิ่ง</option>
              <option value="ออกแบบ">ออกแบบ</option>
              <option value="การตลาด">การตลาด</option>
              <option value="ข้อมูล">ข้อมูล</option>
            </select>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h2 className="font-semibold text-sky-600 mr-2">Length</h2>
              <h2 className="font-semibold">ความยาว</h2>
            </div>
            <select 
              className="w-full p-2 border rounded"
              value={selectedLength}
              onChange={(e) => setSelectedLength(e.target.value)}
            >
              <option value="">ทั้งหมด</option>
              <option value="short">0-5 ชั่วโมง</option>
              <option value="medium">6-10 ชั่วโมง</option>
              <option value="long">11+ ชั่วโมง</option>
            </select>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h2 className="font-semibold text-sky-600 mr-2">Rating</h2>
              <h2 className="font-semibold">คะแนน</h2>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                4.5 ขึ้นไป
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                4.0 ขึ้นไป
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                3.5 ขึ้นไป
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <UserCourse />
      </div>
    </div>
  );
}

export default HomeUser;
