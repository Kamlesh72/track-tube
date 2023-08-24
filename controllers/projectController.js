import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const createProjectController = async (req, res) => {
  try {
    const newProject = projectModel(req.body);
    await newProject.save();
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    await userModel.findByIdAndUpdate(decode._id, {
      $push: {
        projects: {
          _id: newProject._id,
          title: req.body.title,
          thumbnail: req.body.thumbnail,
        },
      },
    });
    res.send({ ok: true, message: "Project Controller Touched" });
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};

export const viewProjectController = async (req, res) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    const user = await userModel.findById(decode._id).lean();
    let projects = await projectModel
      .find(
        { _id: { $in: user.projects.map((project) => project._id) } },
        "totalvideos completedVideos"
      )
      .lean();
    const updatedProjects = projects.map((project, index) => ({
      ...project,
      ...user.projects[index],
    }));
    res.send({
      ok: true,
      message: "View Project Controller",
      projects: updatedProjects,
    });
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};

export const oneProjectController = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    res.send({ ok: true, message: "One Project Controller", project });
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};

export const onePostProjectController = async (req, res) => {
  try {
    let completedVideos = 0;
    req.body.forEach((item) => {
      if (item.isCompleted) completedVideos++;
    });
    const project = await projectModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { videos: req.body, completedVideos },
      },
      { new: true }
    );
    res.send({ ok: true, message: "One Post Project Controller", project });
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};

export const dashboardController = async (req, res) => {
  try {
    res.send({ ok: true, message: "Dashboard Controller" });
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    await projectModel.findByIdAndDelete(req.params.id);
    const user = await userModel
      .findByIdAndUpdate(
        decode._id,
        {
          $pull: {
            projects: {
              _id: req.params.id,
            },
          },
        },
        { new: true }
      )
      .lean();
    let projects = await projectModel
      .find(
        { _id: { $in: user.projects.map((project) => project._id) } },
        "totalvideos completedVideos"
      )
      .lean();
    const updatedProjects = projects.map((project, index) => ({
      ...project,
      ...user.projects[index],
    }));
    res.send({
      ok: true,
      message: "View Project Controller",
      projects: updatedProjects,
    });
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};

export const notesProjectController = async (req, res) => {
  try {
    const updatedProject = await projectModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { [`videos.${req.params.videoIndex}.notes`]: req.body.notes },
      },
      { new: true }
    );
    res.send({
      ok: true,
      message: "Notes Project Controller",
      project: updatedProject,
    });
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};
