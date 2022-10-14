import React from "react";
import AllTasks from "../../components/loadtask/Alltasks";
import Container from "../../components/sign/Container";

const AllTasksPage = (props) => {
  const tasksData = props.tasksData;
  return (
    <div>
      <AllTasks tasksData={tasksData} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  // const DUMMY_task = [
  //   {
  //     _id: "1234",
  //     fileName: "hello.pdf",
  //     signatureDatas: [{ x: 0, y: 0 }],
  //     textDatas: [
  //       { x: 100, y: 100 },
  //       { x: 200, y: 200 },
  //       { x: 300, y: 300 },
  //     ],
  //   },
  //   {
  //     _id: "2234",
  //     fileName: "nihou.pdf",
  //     signatureDatas: [{ x: 0, y: 0 }],
  //     textDatas: [
  //       { x: 100, y: 100 },
  //       { x: 200, y: 200 },
  //       { x: 300, y: 300 },
  //     ],
  //   },
  // ];
  const tasksResult = await fetch("http://localhost:8080/get-tasks");
  const tasksData = await tasksResult.json();
  const tasks = tasksData.tasks.map((taskData) => {
    return {
      _id: taskData._id.toString(),
      fileName: taskData.fileName,
      signatureDatas: taskData.signatureDatas,
      textDatas: taskData.textDatas,
    };
  });
  return {
    props: {
      tasksData: tasks,
    },
  };
};

export default AllTasksPage;
