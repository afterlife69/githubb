import { createContext, useContext, useState } from 'react';

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [teacherData, setTeacherData] = useState(null);

  const setTeacher = (data) => {
    setTeacherData(data);
  };

  return (
    <TeacherContext.Provider value={{ teacherData, setTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacherContext = () => {
  return useContext(TeacherContext);
};
