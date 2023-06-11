// write all related function to community_activities entity down below
const { Sequelize } = require("sequelize");
const CommunityModel = require("../models").community;
const CommunityUser = require("../models").communityUser;
const CommunityActivityModel = require("../models").communityActivity;

// READ - GET ACTIVITY DETAIL BY communitiesId
const getAllActivities = async (req, res) => {
  // membuat variabel untuk menyimpan status, message, dan data
  let response = {};

  // menyimpan parameter id ke variabel communityId
  const communityId = req.params.id;
  const communityActivities = await CommunityActivityModel.findAll({
    where: {
      communities_id: communityId,
    },
    group: [
      "status",
      "id", // Include the non-aggregated column 'id'
    ],
  });

  // untuk mengecek apakah data yang coba diambil ada di db atau tidak
  if (communityActivities === null) {
    response = {
      status: "SUCCESS",
      message: "Belum ada aktivitas ditambahkan",
    };
  } else {
    response = {
      status: "SUCCESS",
      message: "GET All Activity",
      communityActivities: communityActivities,
    };
  }

  res.status(200).json(response);
  return;
};

// CREATE - POST
const createNewActivity = async (req, res) => {
  let response = {};
  let code = 200;

  if (req.body.communities_id == "" || req.body.communities_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the communities_id property cannot be null",
    };
  } else if (req.body.title == "" || req.body.title == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the title property cannot be null",
    };
  } else if (req.body.description == "" || req.body.description == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the description property cannot be null",
    };
  } else {
    try {
      let defaultDate = new Date();
      // buat komunitas baru
      const newActivity = await CommunityActivityModel.create({
        communities_id: req.body.communities_id,
        title: req.body.title,
        date: req.body.date || defaultDate,
        description: req.body.description,
        status: req.body.status || "upcoming",
      });

      response = {
        status: "SUCCESS",
        message: "New Activity Created Succesfully",
        data: newActivity,
      };
    } catch (error) {
      code = 422;
      response = {
        status: "ERROR",
        message: error.parent.sqlMessage,
      };
    }
  }

  res.status(code).json(response);
};

// UPDATE - PUT
const updateActivity = async (req, res) => {
  let response = {};
  let defaultDate = new Date();
  let code = 200;
  if (req.body.communities_id == "" || req.body.communities_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the leader_id property cannot be null",
    };
  } else if (req.body.title == "" || req.body.title == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the name property cannot be null",
    };
  } else if (req.body.description == "" || req.body.description == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the description property cannot be null",
    };
  } else {
    const communityActivity = await CommunityActivityModel.findByPk(req.params.id);

    if (!communityActivity) {
      response = {
        status: "SUCCESS",
        message: "Data not found",
      };
    } else {
      (communityActivity.communities_id = req.body.communities_id),
        (communityActivity.title = req.body.title),
        (communityActivity.date = req.body.date || defaultDate),
        (communityActivity.status = req.body.status || "upcoming"),
        (communityActivity.description = req.body.description);

      communityActivity.save();
      response = {
        status: "SUCCESS",
        message: "Community Updated Successfully",
        data: communityActivity,
      };
    }

    res.status(code).json(response);
    return;
  }
};

// DELETE - DELETE
const deleteActivity = async (req, res) => {
  let response = {};
  let code = 200;

  const activityId = req.params.id;

  // menghapus komunitas
  const communityActivity = await CommunityActivityModel.findByPk(activityId);
  if (!communityActivity) {
    code = 422;
    response = {
      status: "ERROR",
      message: "Delete error",
    };
  } else {
    communityActivity.destroy();
    response = {
      status: "SUCCESS",
      message: "Activity Deleted Successfully",
    };
  }

  res.status(code).json(response);
  return;
};

module.exports = {
  getAllActivities,
  updateActivity,
  deleteActivity,
  createNewActivity,
};
