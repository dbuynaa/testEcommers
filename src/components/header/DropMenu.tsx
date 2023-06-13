// // import clsx from 'clsx';
import React from 'react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/router';

import { useState } from "react";

// const DropMenu = () => {
//   //{mainCategories}
//   // const router = useRouter();
//   // const { category } = router.query;
//   return (
//     <div className="container flex items-center hover-scroll -x">
//       <div className="dropmenu">
//         <button className="dropbtnmenu">Category</button>
//         <div className="dropmenu-content">
//           <a href="#">Link 1</a>
//           <a href="#">Link 2</a>
//           <a href="#">Link 3</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DropMenu;


const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="product-cats flex container">
      <div
        className="flex flex-col group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="px-4 py-2 text-white rounded focus:outline-none"
          onClick={toggleDropdown}
        >
          Category
        </button>
        <div className="relative">
          <ul className="absolute left-0 top-0 w-40 bg-gray-500 rounded shadow-md hidden flex-col group-hover:flex opacity-0 group-hover:opacity-100">
            <li className="px-4 py-2">Subcategory 1</li>
            <li className="px-4 py-2">Subcategory 2</li>
            <li className="px-4 py-2">Subcategory 3</li>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default DropdownMenu;
