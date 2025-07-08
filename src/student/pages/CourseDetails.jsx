import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../services/api';
import '../styles/CourseDetails.css';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const [courseResponse, referencesResponse] = await Promise.all([
          courses.getById(id),
          courses.getReferences(id)
        ]);
        
        setCourse(courseResponse.data.data);
        setReferences(referencesResponse.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course details');
        setLoading(false);
        console.error('Error fetching course details:', err);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) {
    return <div className="course-details-loading">Loading course details...</div>;
  }

  if (error) {
    return <div className="course-details-error">{error}</div>;
  }

  if (!course) {
    return <div className="course-details-error">Course not found</div>;
  }

  // Convert objectives to array and handle objects
  const objectivesList = Array.isArray(course.objective) 
    ? course.objective.map(obj => typeof obj === 'object' ? obj.name || JSON.stringify(obj) : obj)
    : course.objective 
      ? [typeof course.objective === 'object' ? course.objective.name || JSON.stringify(course.objective) : course.objective]
      : [];

  // Convert prerequisites to array and handle objects
  const prerequisitesList = Array.isArray(course.prequisties) 
    ? course.prequisties.map(obj => typeof obj === 'object' ? obj.name || JSON.stringify(obj) : obj)
    : course.prequisties 
      ? [typeof course.prequisties === 'object' ? course.prequisties.name || JSON.stringify(course.prequisties) : course.prequisties]
      : [];

  return (
    <div className="course-details-container">
      <div className="course-header">
        <h1 className="course-title">{course.name}</h1>
        <div className="course-code">{course.code}</div>
        <div className="instructor-name">Instructor: {course.instructor_name}</div>
      </div>

      <div className="course-info-grid">
        <div className="info-card">
          <h2>Course Details</h2>
          <div className="info-item">
            <span className="label">Credits:</span>
            <span className="value">{course.credits}</span>
          </div>
          <div className="info-item">
            <span className="label">Course Hours:</span>
            <span className="value">{course.hours_course}</span>
          </div>
          <div className="info-item">
            <span className="label">TD Hours:</span>
            <span className="value">{course.hours_td}</span>
          </div>
          <div className="info-item">
            <span className="label">TP Hours:</span>
            <span className="value">{course.hours_tp}</span>
          </div>
          <div className="info-item">
            <span className="label">Semester:</span>
            <span className="value">{course.semester}</span>
          </div>
          <div className="info-item">
            <span className="label">Level:</span>
            <span className="value">{course.level}</span>
          </div>
          {course.classroom_url && (
            <div className="info-item">
              <span className="label">Classroom:</span>
              <a 
                href={course.classroom_url}
                target="_blank"
                rel="noopener noreferrer"
                className="classroom-link"
              >
                Join Class →
              </a>
            </div>
          )}
        </div>

        <div className="info-card">
          <h2>Prerequisites</h2>
          <div className="prerequisites-content">
            {prerequisitesList.length > 0 ? (
              <ul className="prerequisites-list">
                {prerequisitesList.map((prerequisite, index) => (
                  <li key={index}>{prerequisite}</li>
                ))}
              </ul>
            ) : (
              <p className="no-content">No prerequisites specified</p>
            )}
          </div>
        </div>

        <div className="info-card full-width">
          <h2>Description</h2>
          <div className="description-content">
            {course.description ? (
              <p>{course.description}</p>
            ) : (
              <p className="no-content">No description available</p>
            )}
          </div>
        </div>

        <div className="info-card full-width">
          <h2>Objectives</h2>
          <div className="objectives-content">
            {objectivesList.length > 0 ? (
              <ul className="objectives-list">
                {objectivesList.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            ) : (
              <p className="no-content">No objectives specified</p>
            )}
          </div>
        </div>

        <div className="info-card full-width">
          <h2>Course References</h2>
          {references.length > 0 ? (
            <div className="references-grid">
              {references.map((reference) => (
                <div key={reference.id} className="reference-card">
                  <h3>{reference.title}</h3>
                  <p className="reference-type">{reference.type}</p>
                  <p className="reference-author">{reference.author}</p>
                  <p className="reference-year">Year: {reference.year}</p>
                  {reference.description && (
                    <p className="reference-description">{reference.description}</p>
                  )}
                  {reference.url && (
                    <a 
                      href={reference.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="reference-link"
                    >
                      View Reference →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-content">No references available</p>
          )}
        </div>
      </div>
    </div>
  );
} 