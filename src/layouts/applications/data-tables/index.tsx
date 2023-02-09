// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { getStudents } from "./data/studentDataTable";
import axios from "axios";
import { useState, useEffect } from "react";

// Data

function DataTables(): JSX.Element {
  const [students, setStudents] = useState([]);
  try {
    const fetchStudents = async () => {
      const response = await axios.get("/api/students").then((response) => {
        console.log(response);
        const studentsData = response.data;
        setStudents(studentsData);
      });
    };

    useEffect(() => {
      fetchStudents();
    }, []);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Datatable Search
            </MDTypography>
            <MDTypography variant="button" color="text">
              A lightweight, extendable, dependency-free javascript HTML table plugin.
            </MDTypography>
          </MDBox>
          <DataTable
            table={{
              columns: [
                { Header: "id", accessor: "_id", width: "25%" },
                { Header: "name", accessor: "name", width: "30%" },
                { Header: "surname", accessor: "surname" },
                { Header: "studentId", accessor: "studentId", width: "12%" },
              ],
              rows: students,
            }}
            canSearch
          />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
