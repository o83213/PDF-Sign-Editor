import React from "react";
import SingleTask from "../../components/loadtask/SingleTask";
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

const SignDocPage = (props) => {
  return <SingleTask task={props.task} />;
};

export const getServerSideProps = async (context) => {
  const params = context.params;
  const taskId = params.taskId;
  try {
    const taskResult = await fetch("http://localhost:8080/get-task/" + taskId);
    const taskData = await taskResult.json();
    const task = {
      _id: taskData.task._id.toString(),
      fileName: taskData.task.fileName,
      signatureDatas: taskData.task.signatureDatas,
      textDatas: taskData.task.textDatas,
    };
    return {
      props: {
        task: task,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        task: [],
      },
    };
  }
};
export default SignDocPage;
