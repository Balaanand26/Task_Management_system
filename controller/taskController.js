import Task from "../models/Task.js";

export const getallTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ msg: "Tasks found successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!validateObjectId(taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({
      _id: taskId,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }

    res.status(200).json({
      status: true,
      task,
      msg: "Task found successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};


export const postTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res
        .status(400)
        .json({ status: false, msg: "Description of task not found" });
    }
    const task = await Task.create({ user: req.user.id, description });
    res
      .status(200)
      .json({ task, status: true, msg: "Task created successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res
        .status(400)
        .json({ status: false, msg: "Description of task not found" });
    }

    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res
        .status(400)
        .json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res
        .status(403)
        .json({ status: false, msg: "You can't update task of another user" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { description },
      { new: true },
    );
    res
      .status(200)
      .json({ task, status: true, msg: "Task updated successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res
        .status(400)
        .json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res
        .status(403)
        .json({ status: false, msg: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};
