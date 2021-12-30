import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { DELETE_TASK } from "../../../utils/graphQL/mutation";
import { Icon, Button, Header, Modal } from "semantic-ui-react";
import { priorityOptions } from "../Data";
import "./TaskDetail.scss";

const TaskDetail = ({ task, setCurrentId, mock, rerouting }) => {
  const [deleteTask] = useMutation(DELETE_TASK);
  const [open, setOpen] = useState(false);
  const [mockModal, setMock] = useState(false);
  const color = priorityOptions.find((p) => {
    return p.value === task.prioritylevel;
  });
  const handleChange = () => {
    if (mock) setMock(true);
    else setCurrentId(task.id);
  };
  const handleDelete = async () => {
    if (mock) setMock(true);
    else {
      const { data } = await deleteTask({
        variables: {
          deleteTaskId: task.id,
        },
      });
      window.location.assign(`/${rerouting}`);
    }
  };

  return (
    <div
      className="taskDetailContainer"
      style={{ backgroundColor: `#${color.color}` }}
    >
      <div className="name">{task.name}</div>
      <div>
        <Icon
          color="white"
          className="icon"
          name="pencil alternate"
          onClick={() => handleChange()}
        />

        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
          trigger={
            <Icon color="white" className="iconTask" name="trash alternate" />
          }
        >
          <Header icon>
            <Icon name="archive" />
            Delete "{task.name}" Task
          </Header>
          <Modal.Content>
            <p>Are you sure you want to delete the task ?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={() => setOpen(false)}>
              <Icon name="remove" /> No
            </Button>
            <Button
              color="purple"
              inverted
              onClick={() => {
                setOpen(false);
                handleDelete();
              }}
            >
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal
          basic
          onClose={() => setMock(false)}
          onOpen={() => setMock(true)}
          open={mockModal}
          size="small"
        >
          <Header icon>
            <Icon name="user circle" />
            You're not signed in :(
          </Header>
          <Modal.Content>
            <p>Sign in to create your own task list and make changes on it</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={() => setMock(false)}>
              <Icon name="remove" /> No
            </Button>
            <NavLink to="/signin">
              <Button
                color="purple"
                className="linkModal"
                inverted
                onClick={() => setMock(false)}
              >
                {" "}
                <Icon name="checkmark" onClick={() => setMock(false)} />
                Yes
              </Button>
            </NavLink>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
};

export default TaskDetail;
