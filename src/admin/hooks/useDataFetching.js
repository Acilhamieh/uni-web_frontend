import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Mock data for testing
const mockData = {
  '/api/users': [
    { id: 1, fname: 'John', lname: 'Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: 2, fname: 'Jane', lname: 'Smith', email: 'jane@example.com', role: 'teacher', status: 'active' },
    { id: 3, fname: 'Bob', lname: 'Wilson', email: 'bob@example.com', role: 'student', status: 'inactive' },
  ],
  '/api/admins': [
    {
      id: 1,
      name: 'Super Admin',
      email: 'super@example.com',
      role: 'superadmin',
      status: 'active',
      lastLogin: '2024-02-20T10:30:00Z'
    },
    {
      id: 2,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-02-19T15:45:00Z'
    },
    {
      id: 3,
      name: 'System Admin',
      email: 'system@example.com',
      role: 'superadmin',
      status: 'active',
      lastLogin: '2024-02-20T09:15:00Z'
    },
    {
      id: 4,
      name: 'Content Admin',
      email: 'content@example.com',
      role: 'admin',
      status: 'inactive',
      lastLogin: '2024-02-18T11:20:00Z'
    },
  ],
  '/api/courses': [
    {
      id: 1,
      name: 'Introduction to Computer Science',
      code: 'CS101',
      credits: 3,
      department: 'Computer Science',
      description: 'An introductory course to computer science principles',
      status: 'active'
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      code: 'CS201',
      credits: 4,
      department: 'Computer Science',
      description: 'Advanced course covering fundamental data structures and algorithms',
      status: 'active'
    },
    {
      id: 3,
      name: 'Database Management Systems',
      code: 'CS301',
      credits: 3,
      department: 'Computer Science',
      description: 'Introduction to database design and SQL',
      status: 'active'
    },
    {
      id: 4,
      name: 'Web Development',
      code: 'CS401',
      credits: 4,
      department: 'Computer Science',
      description: 'Modern web development technologies and practices',
      status: 'inactive'
    },
  ],
  '/api/sessions': [
    {
      id: 1,
      title: 'Introduction to Programming Concepts',
      courseCode: 'CS101',
      type: 'lecture',
      date: '2024-02-21',
      time: '09:00',
      location: 'Room 101',
      instructor: 'Dr. John Smith',
      status: 'scheduled',
      description: 'Introduction to basic programming concepts and syntax.'
    },
    {
      id: 2,
      title: 'Data Structures Lab 1',
      courseCode: 'CS201',
      type: 'lab',
      date: '2024-02-21',
      time: '14:00',
      location: 'Computer Lab A',
      instructor: 'Prof. Jane Doe',
      status: 'scheduled',
      description: 'Hands-on practice with arrays and linked lists.'
    },
    {
      id: 3,
      title: 'Database Design Tutorial',
      courseCode: 'CS301',
      type: 'tutorial',
      date: '2024-02-20',
      time: '11:00',
      location: 'Room 203',
      instructor: 'Dr. Mike Wilson',
      status: 'completed',
      description: 'ER diagrams and normalization practice.'
    },
    {
      id: 4,
      title: 'Web Development Workshop',
      courseCode: 'CS401',
      type: 'lab',
      date: '2024-02-19',
      time: '13:00',
      location: 'Computer Lab B',
      instructor: 'Prof. Sarah Johnson',
      status: 'completed',
      description: 'Building responsive layouts with CSS Grid and Flexbox.'
    },
    {
      id: 5,
      title: 'Algorithm Analysis',
      courseCode: 'CS201',
      type: 'lecture',
      date: '2024-02-22',
      time: '10:00',
      location: 'Room 102',
      instructor: 'Dr. John Smith',
      status: 'scheduled',
      description: 'Big O notation and complexity analysis.'
    },
    {
      id: 6,
      title: 'Database Lab - SQL Queries',
      courseCode: 'CS301',
      type: 'lab',
      date: '2024-02-19',
      time: '15:00',
      location: 'Computer Lab A',
      instructor: 'Dr. Mike Wilson',
      status: 'cancelled',
      description: 'Practice with complex SQL queries and joins.'
    }
  ],
  '/api/doctors': [
    {
      id: 1,
      name: 'Dr. John Smith',
      email: 'john.smith@university.edu',
      phone: '+1 (555) 123-4567',
      linkedin_url: 'https://linkedin.com/in/johnsmith',
      office_room: '301',
      bio: 'Dr. Smith specializes in algorithms and data structures with over 15 years of teaching experience.',
      qualifications: 'Ph.D. in Computer Science, MIT\nM.S. in Computer Engineering, Stanford'
    },
    {
      id: 2,
      name: 'Prof. Jane Doe',
      email: 'jane.doe@university.edu',
      phone: '+1 (555) 234-5678',
      linkedin_url: 'https://linkedin.com/in/janedoe',
      office_room: '205',
      bio: 'Prof. Doe is an expert in software engineering and project management, leading various industry collaborations.',
      qualifications: 'Ph.D. in Software Engineering, Berkeley\nM.S. in Computer Science, UCLA'
    },
    {
      id: 3,
      name: 'Dr. Mike Wilson',
      email: 'mike.wilson@university.edu',
      phone: '+1 (555) 345-6789',
      linkedin_url: 'https://linkedin.com/in/mikewilson',
      office_room: '405',
      bio: 'Dr. Wilson focuses on database management systems and data mining techniques.',
      qualifications: 'Ph.D. in Computer Science, Stanford\nM.S. in Information Systems, CMU'
    },
    {
      id: 4,
      name: 'Prof. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      phone: '+1 (555) 456-7890',
      specialization: 'Web Technologies',
      department: 'Computer Science',
      status: 'active',
      bio: 'Prof. Johnson specializes in modern web development and user interface design.',
      qualifications: 'Ph.D. in Human-Computer Interaction, CMU\nM.S. in Web Science, MIT',
      officeHours: 'Tue, Thu: 09:00 - 11:00',
      officeLocation: 'Building B, Room 410',
      profileImage: null
    },
    {
      id: 5,
      name: 'Dr. Robert Chen',
      email: 'robert.chen@university.edu',
      phone: '+1 (555) 567-8901',
      specialization: 'Artificial Intelligence',
      department: 'Computer Science',
      status: 'inactive',
      bio: 'Dr. Chen researches artificial intelligence and machine learning applications.',
      qualifications: 'Ph.D. in AI, Stanford\nM.S. in Computer Science, Berkeley',
      officeHours: 'Currently on sabbatical',
      officeLocation: 'Building A, Room 512',
      profileImage: null
    }
  ],
  '/api/references': [
    {
      id: 1,
      title: 'Introduction to Algorithms',
      type: 'textbook',
      author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
      course: 'Data Structures and Algorithms',
      year: 2009,
      description: 'A comprehensive introduction to algorithms and data structures. Covers a broad range of algorithms in depth.',
      publisher: 'MIT Press',
      edition: '3rd Edition',
      isbn: '978-0262033848',
      url: null,
      status: 'available'
    },
    {
      id: 2,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      type: 'textbook',
      author: 'Robert C. Martin',
      course: 'Software Engineering',
      year: 2008,
      description: 'A guide to writing clean, maintainable code and the principles of software craftsmanship.',
      publisher: 'Prentice Hall',
      edition: '1st Edition',
      isbn: '978-0132350884',
      url: null,
      status: 'available'
    },
    {
      id: 3,
      title: 'Recent Advances in Deep Learning',
      type: 'article',
      author: 'Sarah Johnson, Michael Chen',
      course: 'Artificial Intelligence',
      year: 2023,
      description: 'A comprehensive survey of recent developments in deep learning architectures and applications.',
      publisher: 'IEEE Transactions on AI',
      edition: 'Vol. 45, Issue 3',
      isbn: null,
      url: 'https://journal.ieee.org/ai/article/45-3',
      status: 'available'
    },
    {
      id: 4,
      title: 'Web Development Best Practices Guide',
      type: 'online',
      author: 'MDN Web Docs',
      course: 'Web Development',
      year: 2023,
      description: 'Comprehensive guide to modern web development practices, including HTML5, CSS3, and JavaScript.',
      publisher: 'Mozilla',
      edition: null,
      isbn: null,
      url: 'https://developer.mozilla.org/guides/web-dev',
      status: 'available'
    },
    {
      id: 5,
      title: 'Database Systems: The Complete Book',
      type: 'textbook',
      author: 'Hector Garcia-Molina, Jeffrey D. Ullman, Jennifer Widom',
      course: 'Database Management',
      year: 2008,
      description: 'Comprehensive coverage of database systems principles and techniques.',
      publisher: 'Pearson',
      edition: '2nd Edition',
      isbn: '978-0131873254',
      url: null,
      status: 'unavailable'
    },
    {
      id: 6,
      title: 'Quantum Computing: A Practical Approach',
      type: 'article',
      author: 'David Miller',
      course: 'Quantum Computing',
      year: 2023,
      description: 'Introduction to practical quantum computing concepts and current industry applications.',
      publisher: 'ACM Computing Surveys',
      edition: 'Vol. 56, Issue 2',
      isbn: null,
      url: 'https://dl.acm.org/quantum/article/56-2',
      status: 'available'
    }
  ],
  '/api/news': [
    {
      id: 1,
      title: 'New Computer Science Program Launch',
      type: 'news',
      date: '2024-03-15',
      author: 'Dr. John Smith',
      content: 'We are excited to announce the launch of our new Computer Science program, featuring cutting-edge curriculum in AI, Machine Learning, and Cloud Computing. The program will begin accepting applications for the Fall 2024 semester.',
      summary: 'Launch of new Computer Science program with focus on AI and ML',
      featured: true,
      status: 'published',
      image: '/images/cs-program.jpg',
      tags: ['computer science', 'education', 'program launch']
    },
    {
      id: 2,
      title: 'Important: Spring Break Schedule Changes',
      type: 'announcement',
      date: '2024-03-10',
      author: 'Academic Affairs Office',
      content: 'Due to the upcoming facility maintenance, the spring break schedule has been adjusted. The break will now run from March 25th to April 5th. All classes will resume on April 8th.',
      summary: 'Spring break dates changed to March 25 - April 5',
      featured: false,
      status: 'published',
      image: null,
      tags: ['schedule', 'academic calendar', 'spring break']
    },
    {
      id: 3,
      title: 'Annual Technology Symposium 2024',
      type: 'event',
      date: '2024-04-15',
      author: 'Events Committee',
      content: 'Join us for our Annual Technology Symposium featuring keynote speakers from leading tech companies. The event will showcase student projects, research presentations, and networking opportunities.',
      summary: 'Annual tech symposium with industry speakers and student presentations',
      featured: true,
      status: 'published',
      image: '/images/tech-symposium.jpg',
      tags: ['event', 'technology', 'symposium']
    },
    {
      id: 4,
      title: 'Research Grant Achievement',
      type: 'news',
      date: '2024-03-08',
      author: 'Research Department',
      content: 'Our university has secured a $2 million research grant for advancing quantum computing research. The project will be led by Dr. Sarah Johnson and will involve collaboration with leading quantum computing labs.',
      summary: '$2M grant secured for quantum computing research',
      featured: true,
      status: 'published',
      image: '/images/quantum-research.jpg',
      tags: ['research', 'quantum computing', 'grant']
    },
    {
      id: 5,
      title: 'Campus Wi-Fi Maintenance',
      type: 'announcement',
      date: '2024-03-20',
      author: 'IT Department',
      content: 'Scheduled maintenance of campus Wi-Fi networks will be conducted on March 20th from 2 AM to 6 AM. Some network services may be temporarily unavailable during this time.',
      summary: 'Wi-Fi maintenance scheduled for March 20th',
      featured: false,
      status: 'published',
      image: null,
      tags: ['maintenance', 'IT', 'campus services']
    },
    {
      id: 6,
      title: 'Summer Internship Fair',
      type: 'event',
      date: '2024-04-20',
      author: 'Career Services',
      content: 'The Summer Internship Fair will be held in the main auditorium. Over 50 companies will be present to recruit students for summer internships. Bring your resume and dress professionally.',
      summary: 'Summer internship fair with 50+ companies',
      featured: true,
      status: 'draft',
      image: '/images/internship-fair.jpg',
      tags: ['career', 'internship', 'recruitment']
    }
  ],
  '/api/projects': [
    {
      id: 1,
      title: 'AI-Powered Healthcare Diagnostics',
      type: 'research',
      supervisor: 'Dr. Sarah Johnson',
      team: [
        { name: 'Michael Chen' },
        { name: 'Emily Brown' },
        { name: 'David Wilson' },
        { name: 'Lisa Anderson' }
      ],
      department: 'Computer Science',
      deadline: '2024-06-30',
      description: 'Development of an AI system for early disease detection using medical imaging data.',
      objectives: '1. Develop deep learning models for image analysis\n2. Validate system accuracy\n3. Create user interface for medical staff',
      status: 'in progress',
      budget: 75000,
      tags: ['AI', 'healthcare', 'machine learning']
    },
    {
      id: 2,
      title: 'Smart Campus Navigation System',
      type: 'collaborative',
      supervisor: 'Prof. James Miller',
      team: [
        { name: 'Alex Turner' },
        { name: 'Sophie Lee' },
        { name: 'Ryan Martinez' }
      ],
      department: 'Software Engineering',
      deadline: '2024-05-15',
      description: 'Creating an interactive campus navigation system using IoT sensors and mobile app.',
      objectives: '1. Deploy IoT sensors\n2. Develop mobile application\n3. Implement real-time tracking',
      status: 'pending',
      budget: 45000,
      tags: ['IoT', 'mobile app', 'navigation']
    },
    {
      id: 3,
      title: 'Sustainable Energy Solutions',
      type: 'research',
      supervisor: 'Dr. Robert Chen',
      team: [
        { name: 'Jessica White' },
        { name: 'Thomas Brown' },
        { name: 'Maria Garcia' }
      ],
      department: 'Environmental Engineering',
      deadline: '2024-08-30',
      description: 'Research on renewable energy integration in urban environments.',
      objectives: '1. Analyze current energy consumption patterns\n2. Design sustainable solutions\n3. Create implementation roadmap',
      status: 'in progress',
      budget: 120000,
      tags: ['sustainability', 'renewable energy', 'urban planning']
    },
    {
      id: 4,
      title: 'Database Design Project',
      type: 'academic',
      supervisor: 'Prof. Mike Wilson',
      team: [
        { name: 'Chris Taylor' },
        { name: 'Amanda Lee' }
      ],
      department: 'Computer Science',
      deadline: '2024-04-20',
      description: 'Design and implementation of an optimized database system for the university.',
      objectives: '1. Analyze requirements\n2. Design database schema\n3. Implement and test system',
      status: 'completed',
      budget: 0,
      tags: ['database', 'system design']
    },
    {
      id: 5,
      title: 'Virtual Reality Learning Platform',
      type: 'collaborative',
      supervisor: 'Dr. Jane Doe',
      team: [
        { name: 'Kevin Park' },
        { name: 'Sarah Thompson' },
        { name: 'John Anderson' },
        { name: 'Rachel Kim' }
      ],
      department: 'Educational Technology',
      deadline: '2024-07-15',
      description: 'Development of VR-based interactive learning environments for various subjects.',
      objectives: '1. Create VR content\n2. Develop learning modules\n3. Test with student groups',
      status: 'in progress',
      budget: 90000,
      tags: ['VR', 'education', 'interactive learning']
    },
    {
      id: 6,
      title: 'Quantum Computing Research',
      type: 'research',
      supervisor: 'Dr. Alan Cooper',
      team: [
        { name: 'Michelle Zhang' },
        { name: 'Daniel Lee' },
        { name: 'Laura Wilson' }
      ],
      department: 'Physics',
      deadline: '2024-12-31',
      description: 'Research on quantum computing algorithms and their applications.',
      objectives: '1. Develop quantum algorithms\n2. Simulate quantum systems\n3. Analyze performance metrics',
      status: 'pending',
      budget: 200000,
      tags: ['quantum computing', 'algorithms', 'physics']
    }
  ],
  '/api/trainees': [
    {
      id: 1,
      name: 'Alex Thompson',
      email: 'alex.thompson@university.edu',
      phone: '+1 (555) 123-4567',
      program: 'internship',
      department: 'Software Development',
      supervisor: 'Dr. Sarah Johnson',
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      status: 'active',
      institution: 'MIT',
      degree: 'Computer Science',
      objectives: '1. Learn full-stack development\n2. Contribute to production codebase\n3. Develop team collaboration skills',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      notes: 'Excellent progress in frontend development tasks',
      profileImage: null
    },
    {
      id: 2,
      name: 'Emily Chen',
      email: 'emily.chen@university.edu',
      phone: '+1 (555) 234-5678',
      program: 'training',
      department: 'Data Science',
      supervisor: 'Dr. Michael Wilson',
      startDate: '2024-03-15',
      endDate: '2024-06-15',
      status: 'active',
      institution: 'Stanford University',
      degree: 'Data Science',
      objectives: '1. Master data analysis techniques\n2. Develop ML models\n3. Present research findings',
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
      notes: 'Shows strong analytical skills',
      profileImage: null
    },
    {
      id: 3,
      name: 'Marcus Rodriguez',
      email: 'marcus.rodriguez@university.edu',
      phone: '+1 (555) 345-6789',
      program: 'internship',
      department: 'UI/UX Design',
      supervisor: 'Prof. Lisa Anderson',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      status: 'completed',
      institution: 'Rhode Island School of Design',
      degree: 'Interaction Design',
      objectives: '1. Design user interfaces\n2. Conduct user research\n3. Create design systems',
      skills: ['UI Design', 'Figma', 'User Research', 'Prototyping'],
      notes: 'Successfully completed all assigned projects',
      profileImage: null
    },
    {
      id: 4,
      name: 'Sarah Kim',
      email: 'sarah.kim@university.edu',
      phone: '+1 (555) 456-7890',
      program: 'training',
      department: 'Cybersecurity',
      supervisor: 'Dr. James Miller',
      startDate: '2024-04-01',
      endDate: '2024-09-30',
      status: 'pending',
      institution: 'Georgia Tech',
      degree: 'Information Security',
      objectives: '1. Learn security protocols\n2. Perform security audits\n3. Implement security measures',
      skills: ['Network Security', 'Penetration Testing', 'Security Analysis'],
      notes: 'Starting next month',
      profileImage: null
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@university.edu',
      phone: '+1 (555) 567-8901',
      program: 'internship',
      department: 'Cloud Infrastructure',
      supervisor: 'Dr. Robert Chen',
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      status: 'terminated',
      institution: 'University of Washington',
      degree: 'Cloud Computing',
      objectives: '1. Deploy cloud services\n2. Manage infrastructure\n3. Implement DevOps practices',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      notes: 'Program terminated due to attendance issues',
      profileImage: null
    },
    {
      id: 6,
      name: 'Rachel Brown',
      email: 'rachel.brown@university.edu',
      phone: '+1 (555) 678-9012',
      program: 'training',
      department: 'AI Research',
      supervisor: 'Dr. Alan Cooper',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      status: 'active',
      institution: 'UC Berkeley',
      degree: 'Artificial Intelligence',
      objectives: '1. Develop AI models\n2. Research NLP techniques\n3. Implement deep learning solutions',
      skills: ['Python', 'TensorFlow', 'NLP', 'Deep Learning'],
      notes: 'Showing exceptional progress in NLP projects',
      profileImage: null
    }
  ]
};

export const useDataFetching = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Fetch data from database
      const response = await fetch(endpoint);

      const result = await response.json();

      //console.log(mockData[endpoint])
      //setData(mockData.endpoint);

      if (response.ok) {
        console.log('Fetched data:', result);
        setData(result.data);
        setError(null);

      } else {
        console.log("response error");
        setError('Error fetching data');
      }

    } catch (err) {
      console.log("request not send")
      setError('Error fetching data');
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newData, endpoint) => {
    try {
      console.log("newData", newData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();

      if (result.success) {
        // Add the returned data from API to the state
        setData([...data, result.data]);
        toast.success(result.message);
      }

      else{
        toast.error(result.message);
      }

    } catch (err) {
      toast.error('Error creating item');
      throw err;
    }
  };

  const handleUpdate = async (updatedData, endpoint) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
  
      const response = await fetch(`${endpoint}${updatedData.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
  
      if(result.success){
        setData(data.map(item => item.id === updatedData.id ? result.data : item));
        toast.success(result.message);
      }
      else{
        toast.error(result.message);
      }
      
    } catch (err) {
      toast.error('Error updating item');
      throw err;
    }
  };

  const handleDelete = async (id, endpoint) => {
    try {
      // Make DELETE request to the API
      const response = await fetch(`${endpoint}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (result.success) {
        // Remove the deleted item from state
        setData(data.filter(item => item.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Error deleting item');
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
    refetch: fetchData
  };
}; 