// all functions related to community are listed down below
const { Sequelize } = require("sequelize");
const { format } = require("date-fns");
const { id } = require("date-fns/locale");
const CommunityModel = require("../models").community;
const UserModel = require("../models").user;
const CommunityActivityModel = require("../models").communityActivity;

// READ - GET
const getAllCommunity = async (req, res) => {
  try {
    const communities = await CommunityModel.findAll({
      attributes: ["id", "name", "location", "leader_id"],
    });

    const leaderIds = communities.map((community) => community.leader_id); // mengambil semua leader_id dari communities

    // mengambil semua data nama dan id leader yang ada di variabel leaderIds
    const leaders = await UserModel.findAll({
      attributes: ["id", "name"],
      where: {
        id: leaderIds,
      },
    });

    const leaderMap = leaders.reduce((map, leader) => {
      map[leader.id] = leader.name; // mapping leader_id dan leader leader_name
      return map;
    }, {});

    const communityData = communities.map((community) => ({
      id: community.id,
      name: community.name,
      location: community.location,
      leader_id: community.leader_id,
      leader_name: leaderMap[community.leader_id], // Add leader name to each community object
    }));

    res.json({
      success: true,
      message: "SUCCESS",
      communityData: communityData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving communities",
      error: error.message,
    });
  }
};

// READ - GET DETAIL
const getCommunityDetail = async (req, res) => {
  try {
    // membuat variabel untuk menyimpan status, message, dan data
    let response = {};
    let communityId = req.params.id;

    // mengambil data komunitas dan aktivitasnya berdasarkan communityId
    const communityDetail = await CommunityModel.findByPk(communityId, {
      attributes: ["id", "name", "location", "description", "leader_id"],
    });

    // mengambil aktivitas di satu komunitas
    const communityActivities = await CommunityActivityModel.findAll({
      where: {
        communities_id: communityId,
      },
      attributes: ["communities_id", "title", "description", "date", "status"],
      group: ["status", "id"],
    });

    // mengubah format tanggal di dalam array communityActivities
    const formattedActivities = communityActivities.map((activity) => {
      const formattedDate = format(new Date(activity.date), "dd LLLL yyyy", {
        locale: id,
      });

      return {
        title: activity.title,
        description: activity.description,
        date: formattedDate,
        status: activity.status,
      };
    });

    // mengambil data leader komunitas
    const leader = await UserModel.findByPk(communityDetail.leader_id, {
      attributes: ["id", "name"],
    });

    // untuk mengecek apakah data yang coba diambil ada di db atau tidak
    if (!communityDetail) {
      response = {
        success: false,
        status: "SUCCESS",
        message: "No community exists with such id",
      };
    } else {
      response = {
        success: true,
        status: "SUCCESS",
        message: "Community Detail with Activities and its leader information",
        communityDetail: {
          id: communityDetail.id,
          name: communityDetail.name,
          location: communityDetail.location,
          description: communityDetail.description,
        },
        communityActivities: formattedActivities,
        communityLeader: leader,
      };
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      status: "ERROR",
      message: "Error retrieving community detail",
      error: error.message,
    });
  }
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
