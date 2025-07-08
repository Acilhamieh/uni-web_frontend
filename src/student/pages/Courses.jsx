import React, { useEffect, useState } from 'react';
import { courses } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Courses.css';
import '../styles/global.css';

export default function Courses() {
  const [semester, setSemester] = useState(1);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    courses
      .getAll()
      .then((res) => {
        // Handle the API response structure properly
        const coursesData = res.data?.data || [];
        setCourseList(Array.isArray(coursesData) ? coursesData : []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch courses');
        setLoading(false);
        console.error('Error fetching courses:', err);
      });
  }, []);

  // Filter courses by semester
  const filteredCourses = courseList.filter((course) => String(course.semester) === String(semester));

  const handleDecrement = () => {
    setSemester((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handleIncrement = () => {
    setSemester((prev) => (prev < 6 ? prev + 1 : prev));
  };

  return (
    <div className="student-courses-container background-bl">
      <div className="section-title">Courses</div>
      <div className="semester-controls">
        <button 
          className="semester-btn" 
          onClick={handleDecrement} 
          disabled={semester <= 1}
          aria-label="Previous semester"
        >
          <span className="arrow">←</span>
        </button>
        <div className="semester-display">
          <span className="semester-label">Semester</span>
          <span className="semester-number">{semester}</span>
        </div>
        <button 
          className="semester-btn" 
          onClick={handleIncrement} 
          disabled={semester >= 6}
          aria-label="Next semester"
        >
          <span className="arrow">→</span>
        </button>
      </div>
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="courses-table-wrapper">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Instructor</th>
                <th>Credits</th>
                <th>Course Hours</th>
                <th>TD Hours</th>
                <th>TP Hours</th>
                <th>Classroom</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length === 0 ? (
                <tr><td colSpan={8} className="no-courses-message">No courses for this semester.</td></tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.code}</td>
                    <td>
                      <button
                        className="course-link"
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        {course.name}
                      </button>
                    </td>
                    <td>{course.instructor_name}</td>
                    <td>{course.credits}</td>
                    <td>{course.hours_course}</td>
                    <td>{course.hours_td}</td>
                    <td>{course.hours_tp}</td>
                    <td>{course.classroom_url}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}