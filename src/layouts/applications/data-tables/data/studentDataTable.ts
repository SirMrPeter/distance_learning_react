import axios from "axios";
import { useState, useEffect } from "react";

export const getStudents = () => {
  const [students, setStudents] = useState([]);
  try {
    const fetchStudents = async () => {
      const response = await axios.get("/students").then((response) => {
        console.log(response);
        const studentsData = response.data;
        setStudents(studentsData);
      });
    };

    useEffect(() => {
      fetchStudents();
    }, []);

    return students;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
