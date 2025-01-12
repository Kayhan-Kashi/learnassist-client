import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAccessToken } from "../../../../services/authService";

const CourseCard = ({ id, image, title, price, isRegisterable }) => {
  const navigate = useNavigate();

  const registerCourseHandler = (id) => {
    const token = getAccessToken();
    if (token) {
      navigate("/elearning/watch-course/1-1");
    } else {
      navigate("/login");
    }
  };

  const { brand } = useParams();
  return (
    <div className="flex justify-center items-center mx-8 my-0 mt-16">
      <div className="bg-gray-100 p-4 md:p-6 lg:p-8 w-full sm:w-[220px] md:w-[180px] lg:w-[300px] rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
        <Link
          to={`/`}
          //   onClick={() => dispatch(singleProduct(id))}
          className="block relative group"
        >
          <div className="relative overflow-hidden rounded-md">
            <img
              loading="lazy"
              src={image}
              className="object-cover w-full h-40 sm:h-48 rounded-md transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            />
            <img
              src={image}
              className="object-cover w-full h-40 sm:h-48 rounded-md absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          </div>
          <div className="flex flex-col justify-center mt-4">
            <span className="text-lg mb-2 text-center font-semibold text-gray-700">
              {title}
            </span>
            <span className="text-lg text-center font-bold text-amber-600">
              {price == 0 ? "رایگان" : price}
            </span>
          </div>
        </Link>
        {isRegisterable && (
          <div className="w-full flex justify-center mt-4">
            <button
              className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 sm:py-2 sm:px-6 rounded text-sm"
              }
              onClick={() => registerCourseHandler(id)}
            >
              ثبت نام
            </button>
          </div>
        )}
        {!isRegisterable && (
          <div className="w-full flex justify-center mt-4">
            <button
              disabled
              className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-4 sm:py-2 sm:px-6 rounded text-sm"
            >
              به زودی
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
