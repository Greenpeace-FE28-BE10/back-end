// all functions related to community are listed down below
const { Sequelize } = require("sequelize");
const CommunityModel = require("../models").community;
const CommunityUser = require("../models").communityUser;
const CommunityActivityModel = require("../models").communityActivity;

// READ - GET
const getAllCommunity = async (req, res) => {
  try {
    const data = await CommunityModel.findAll();
    res.json({
      message: "GET all community success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving communities",
      error: error.message,
    });
  }
};

// READ - GET DETAIL
const getCommunityDetail = async (req, res) => {
  // membuat variabel untuk menyimpan status, message, dan data
  let response = {};

  // menyimpan parameter id ke variabel communityId
  const communityId = req.params.id;

  // mengambil data komunitas dan aktivitasnya berdasarkan communityId
  const communityDetail = await CommunityModel.findByPk(communityId);
  const communityActivities = await CommunityActivityModel.findAll({
    where: {
      communities_id: communityId,
    },
    attributes: ["communities_id", "title", "description", "date", "status"],
    group: [
      "status",
      "id", // Include the non-aggregated column 'id'
    ],
  });

  // untuk mengecek apakah data yang coba diambil ada di db atau tidak
  if (communityDetail === null) {
    response = {
      status: "SUCCESS",
      message: "Data not found",
    };
  } else {
    response = {
      status: "SUCCESS",
      message: "GET Detail Community",
      communityDetail: communityDetail,
      communityActivities: communityActivities,
    };
  }

  res.status(200).json(response);
  return;
};

// CREATE - POST
const createNewCommunity = async (req, res) => {
  let response = {};
  let code = 200;

  if (req.body.leader_id == "" || req.body.leader_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the leader_id property cannot be null",
    };
  } else if (req.body.name == "" || req.body.name == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the name property cannot be null",
    };
  } else if (req.body.location == "" || req.body.location == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the location property cannot be null",
    };
  } else if (req.body.description == "" || req.body.description == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the description property cannot be null",
    };
  } else {
    try {
      // buat komunitas baru
      const newCommunity = await CommunityModel.create({
        leader_id: req.body.leader_id,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
      });

      // leader sebagai anggota komunitas yang baru
      const newCommunityUser = await CommunityUser.create({
        users_id: req.body.leader_id,
        communities_id: newCommunity.id,
        community_role: "leader",
      });

      response = {
        status: "SUCCESS",
        message: "New Community Created",
        data: newCommunity,
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
const updateCommunity = async (req, res) => {
  let response = {};
  let code = 200;
  if (req.body.leader_id == "" || req.body.leader_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the leader_id property cannot be null",
    };
  } else if (req.body.name == "" || req.body.name == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the name property cannot be null",
    };
  } else if (req.body.location == "" || req.body.location == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the location property cannot be null",
    };
  } else if (req.body.description == "" || req.body.description == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the description property cannot be null",
    };
  } else {
    const community = await CommunityModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!community) {
      response = {
        status: "SUCCESS",
        message: "Data not found",
      };
    } else {
      (community.leader_id = req.body.leader_id), (community.name = req.body.name), (community.location = req.body.location), (community.description = req.body.description);

      community.save();
      response = {
        status: "SUCCESS",
        message: "Community Updated Successfully",
        data: community,
      };
    }

    res.status(code).json(response);
    return;
  }
};

// UPDATE - PATCH
const updateCommunity2 = async (req, res) => {
  let response = {};
  let code = 200;

  const community = await CommunityModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!community) {
    response = {
      status: "SUCCESS",
      message: "Data not found",
    };
  } else {
    (community.leader_id = req.body.leader_id), (community.name = req.body.name), (community.location = req.body.location), (community.description = req.body.description);
    community.save();
    response = {
      status: "SUCCESS",
      message: "Community Updated Successfully",
      data: community,
    };
  }

  res.status(code).json(response);
  return;
};

// DELETE - DELETE
const deleteCommunity = async (req, res) => {
  let response = {};
  let code = 200;

  const communityId = req.params.id;

  // hapus semua data member komunitas
  await CommunityUser.destroy({
    where: {
      communities_id: communityId,
    },
  });

  // hapus semua data aktivitas komunitas
  await CommunityActivityModel.destroy({
    where: {
      communities_id: communityId,
    },
  });

  // menghapus komunitas
  const community = await CommunityModel.findByPk(communityId);
  if (!community) {
    code = 422;
    response = {
      status: "ERROR",
      message: "Delete error",
    };
  } else {
    community.destroy();
    response = {
      status: "SUCCESS",
      message: "Community Deleted Successfully",
    };
  }

  res.status(code).json(response);
  return;
};

module.exports = {
  getAllCommunity,
  createNewCommunity,
  updateCommunity,
  updateCommunity2,
  deleteCommunity,
  getCommunityDetail,
};
