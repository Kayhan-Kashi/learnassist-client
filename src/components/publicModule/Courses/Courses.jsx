import React, { useEffect } from "react";
import CourseCard from "./CourseCard/CourseCard";
import eLearningCarousel from "../../../assets/course_basic_statistics.jpg";
import courseHarmonyImage from "../../../assets/course_pro_statistics.jpg";
import advancedTheoryImage from "../../../assets/inferential_statistic.jpg";
import { useSelector } from "react-redux";

const courses = [
  {
    id: "1234-12343-123432-12343243-111",
    image: eLearningCarousel,
    title: "آموزش مقدماتی آمار ",
    price: 0,
    isRegisterable: true,
  },
  {
    id: "1234-12343-123432-12343243-222",
    image: advancedTheoryImage,
    title: " آموزش آمار پیشرفته",
    price: 0,
    isRegisterable: false,
  },
  {
    id: "1234-12343-123432-12343243-333",
    image: courseHarmonyImage,
    title: "آموزش آمار استنباطی",
    price: "به زودی",
    isRegisterable: false,
  },
];

const Courses = () => {
  // const userInfo = useSelector((state) => state.login.userInfo);

  // useEffect(() => {
  //   alert(JSON.stringify(userInfo));
  // }, [userInfo]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col mt-2 text-right">
        <h1 className="text-4xl font-bold tracking-normal leading-none my-4 sm:mx-12 p-5 rounded-md">
          دوره های آموزشی
        </h1>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {courses.map((c) => (
              <div className="flex justify-end items-center my-0">
                {" "}
                <CourseCard
                  id={c.id}
                  image={c.image}
                  title={c.title}
                  price={c.price}
                  isRegisterable={c.isRegisterable}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
