import React from "react";
import CourseCard from "./CourseCard/CourseCard";
import eLearningCarousel from "../../assets/course-music.png";
import courseHarmonyImage from "../../assets/course-2.webp";
import advancedTheoryImage from "../../assets/course-3.png";

const Courses = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col mt-2 text-right">
        <h1 className="text-4xl font-bold tracking-normal leading-none my-4 sm:mx-12 p-5 rounded-md">
          دوره های آموزشی
        </h1>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            <div className="flex justify-end items-center my-0">
              <CourseCard
                image={advancedTheoryImage}
                title=" آموزش تئوری موسیقی سطح پیشرفته"
                price="رایگان"
                isRegisterable={false}
              />
            </div>
            <div className="flex justify-end items-center my-0">
              <CourseCard
                image={courseHarmonyImage}
                title="آموزش هارمونی"
                price="به زودی"
                isRegisterable={false}
              />
            </div>
            <div className="flex justify-end items-center my-0">
              <CourseCard
                image={eLearningCarousel}
                title="آموزش مقدماتی تئوری موسیقی"
                price="رایگان"
                isRegisterable={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
