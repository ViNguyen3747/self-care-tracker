import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { animateScroll as scroll } from "react-scroll";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Button, Grid, Dropdown } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { categoriesOptions, priorityOptions } from "../Data";
import { ADD_TASK, UPDATE_TASK } from "../../../utils/graphQL/mutation";
import { GET_TASK } from "../../../utils/graphQL/query";
import { taskSchema } from "../../../utils/validation/taskFormValidation";

const renderLabel = (option) => ({
  color: option.color,
  content: option.text,
});

const initialState = {
  name: "",
  category: "Professional",
  prioritylevel: "A",
  duration: -1,
  start: "00:00",
  finish: "00:00",
  date: new Date(),
};

const TaskForm = ({ currentId, setCurrentId, rerouting }) => {
  const {
    handleSubmit,
    clearErrors,
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: initialState,
  });
  const { data } = useQuery(GET_TASK, { variables: { taskId: currentId } });
  const [addTask] = useMutation(ADD_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  useEffect(() => {
    reset();
    if (data) {
      clearErrors();
      scroll.scrollToTop();
      let { createdAt, id, owner, __typename, ...task } = data.task;

      Object.entries(task).map(([key, value]) =>
        setValue(key, key === "date" ? new Date(value) : value)
      );
    }
  }, [data]);

  const handleFormSubmit = async () => {
    setValue(
      "duration",
      parseFloat(
        timeConvert(getValues("finish")) - timeConvert(getValues("start"))
      )
    );
    let taskData = getValues();
    try {
      if (currentId) {
        const { data } = await updateTask({
          variables: {
            updateTaskId: currentId,
            input: {
              ...taskData,
            },
          },
        });
        clear();
      } else {
        const { data } = await addTask({
          variables: {
            input: {
              ...taskData,
            },
          },
        });
      }
      window.location.assign(`/${rerouting}`);
    } catch (error) {
      console.log(error);
    }
  };
  const clear = () => {
    setCurrentId(null);
    clearErrors();
    reset();
  };

  const timeConvert = (time) => {
    let t = time.split(":");
    return +t[0] * 60 * 60 + +t[1] * 60;
  };
  return (
    <div className="formWrapper">
      <Form className="formContainer" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Form.Field required>
              <input
                type="text"
                {...register("name")}
                placeholder="Task Name..."
              />
              <p className="errorText">{errors.name?.message}</p>
            </Form.Field>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Form.Group widths="equal">
              {" "}
              <Form.Field>
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange } }) => (
                    <>
                      <label>Category</label>
                      <Dropdown
                        selection
                        className="selectStyle"
                        labeled
                        options={categoriesOptions}
                        onChange={(event, data) => onChange(data.value)}
                        value={getValues("category")}
                        renderLabel={renderLabel}
                      />
                      <p className="errorText">{errors.category?.message}</p>
                    </>
                  )}
                />
              </Form.Field>
              <Form.Field>
                <Controller
                  control={control}
                  name="prioritylevel"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <label>Priority Level</label>
                      <Dropdown
                        selection
                        fluid
                        options={priorityOptions}
                        value={getValues("prioritylevel")}
                        onChange={(event, data) => onChange(data.value)}
                      />
                      <p className="errorText">
                        {errors.prioritylevel?.message}
                      </p>
                    </>
                  )}
                />
              </Form.Field>
            </Form.Group>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Start</label>
                <input type="time" name="start" {...register("start")} />
              </Form.Field>
              <Form.Field>
                <label>Finish</label>
                <input type="time" name="finish" {...register("finish")} />
                <p className="errorText">{errors.finish?.message}</p>
              </Form.Field>
            </Form.Group>
          </Grid.Column>
          <Form.Field>
            <label>Date</label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <>
                  <SemanticDatepicker
                    value={getValues("date")}
                    onChange={(event, data) => field.onChange(data.value)}
                  />
                  <p className="errorText">{errors.date?.message}</p>
                </>
              )}
            />
          </Form.Field>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Button color="black" fluid type="submit">
              Submit
            </Button>
          </Grid.Column>
          {currentId && (
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Button color="black" fluid onClick={clear}>
                Clear
              </Button>
            </Grid.Column>
          )}
        </Grid>
      </Form>
    </div>
  );
};

export default TaskForm;
