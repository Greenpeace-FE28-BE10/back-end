// all functions related to community are listed down below
const { Sequelize } = require("sequelize");
const CommunityModel = require("../models").community;

// READ - GET
const getAllCommunity = async (req, res) => {
  try {
    const data = await CommunityModel.findAll();
    res.json({
      message: "GET all users success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users",
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
  console.log(communityId);
  // mengambil data berdasarkan primary key
  const communityDetail = await CommunityModel.findByPk(communityId);

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
      response: communityDetail,
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
      const newCommunity = await CommunityModel.create({
        leader_id: req.body.leader_id,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
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
