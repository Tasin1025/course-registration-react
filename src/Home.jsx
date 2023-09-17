// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";


function Home() {
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [totalCreditHour, setTotalCreditHour] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    
    useEffect(() => {
        fetch('courses.json')
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    const handleSelectCourse = (course) => {
        const newTotalCreditHour = totalCreditHour + course.credit_hour;
        
        if (newTotalCreditHour <= 20) {
            setSelectedCourses([...selectedCourses, course]);
            setTotalCreditHour(newTotalCreditHour);
            setTotalPrice(prevTotalPrice => prevTotalPrice + course.price);
        } else {
            alert("Maximum credit hour limit crossed. Maximum is 20 credit hours.");
        }
    };

    const isCourseSelected = (course) => {
        return selectedCourses.includes(course);
    };

    return (
        <div>
            <div className=" flex" >
                <div className=" flex-auto w-1/2">
                    <h1 className='text-2xl text-center px-5 font-bold pt-6 pb-6'> Course Registration</h1>
                    <div className="cards-container grid grid-cols-3 gap-3 ">
                        {
                        courses.map(course => (
                            <div key={course.id} className="card bg-base-100 shadow-xl m-3 p-3 flex flex-col justify-center items-center ">
                                <figure>
                                    <img src={course.image} alt="Course" />
                                </figure>
                                <div className="card-body p-3">
                                    <h2 className="card-title font-bold text-2xl">{course.title}</h2>
                                    <p className="text-gray-400">{course.description}</p>
                                    <p className="text-2xl text-gray-500">Price : {course.price} Credit : {course.credit_hour} </p>

                                    <div className="card-actions justify-center">
                                        {isCourseSelected(course) ? (
                                            <button
                                                className="btn btn-primary w-full rounded-md bg-slate-400 text-white p-3 mt-2" disabled
                                            >
                                                Selected
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-primary w-full rounded-md bg-[#2F80ED] text-white p-3 mt-2"
                                                onClick={() => handleSelectCourse(course)}
                                            >
                                                Select
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="footer flex-1" >
                    <div className="p-5">
                        <h2 className="text-2xl text-[#2F80ED] py-2 font-semibold" >Credit Hour Remaining : {20 - totalCreditHour} hr</h2>
                        <hr className="p-2" />
                        <h2 className="mb-3 font-semibold text-xl border-b-3">Course Name</h2>
                        <ol>
                            {selectedCourses.map((course, index) => (
                                <li key={index}>{course.title}</li>
                            ))}
                        </ol>
                        <h2 className="mb-3 font-semibold text-xl border-b-2">Total Credit Hour: {totalCreditHour}</h2>
                    
                        <h2 className="mb-3 font-semibold text-xl">Total Price: ${totalPrice}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
