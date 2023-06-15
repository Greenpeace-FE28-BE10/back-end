// all functions related to community are listed down below
const { Sequelize } = require("sequelize");
const { format } = require("date-fns");
const { id } = require("date-fns/locale");
const CommunityModel = require("../models").community;
const CommunityUser = require("../models").communityUser;
const UserModel = require("../models").user;
const CommunityActivityModel = require("../models").communityActivity;

// READ - GET
const getAllCommunity = async (req, res) => {
  try {
    const communities = await CommunityModel.findAll({
      attributes: ["id", "name", "location", "leader_id", "image", "postal_code"],
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
      postal_code: community.postal_code,
      image: community.image,
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
      attributes: ["id", "name", "location", "description", "leader_id", "image", "postal_code"],
    });

    // mengambil aktivitas di satu komunitas
    const communityActivities = await CommunityActivityModel.findAll({
      where: {
        communities_id: communityId,
      },
      attributes: ["id", "communities_id", "title", "description", "date", "status"],
      group: ["status", "id"],
    });

    // mengubah format tanggal di dalam array communityActivities
    const formattedActivities = communityActivities.map((activity) => {
      const formattedDate = format(new Date(activity.date), "dd LLLL yyyy", {
        locale: id,
      });

      return {
        id: activity.id,
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
          postal_code: communityDetail.postal_code,
          image: communityDetail.image,
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
      success: false,
      status: "ERROR",
      message: "the leader_id property cannot be null",
    };
    res.status(code).json(response);
    return;
  } else if (req.body.name == "" || req.body.name == undefined) {
    code = 442;
    response = {
      success: false,
      status: "ERROR",
      message: "the name property cannot be null",
    };
    res.status(code).json(response);
    return;
  } else if (req.body.location == "" || req.body.location == undefined) {
    code = 442;
    response = {
      success: false,
      status: "ERROR",
      message: "the location property cannot be null",
    };
    res.status(code).json(response);
    return;
  } else if (req.body.description == "" || req.body.description == undefined) {
    code = 442;
    response = {
      success: false,
      status: "ERROR",
      message: "the description property cannot be null",
    };
    res.status(code).json(response);
    return;
  } else if (req.body.postal_code == "" || req.body.postal_code == undefined) {
    code = 442;
    response = {
      success: false,
      status: "ERROR",
      message: "the postal_code property cannot be null",
    };
    res.status(code).json(response);
    return;
  } else {
    try {
      // memeriksa apabila user yang sama sudah menjadi leader untuk komunitas yang sudah ada
      const existingLeader = await CommunityModel.findOne({
        where: {
          leader_id: req.body.leader_id,
        },
      });

      // conditional statement untuk user yang sudah menjadi leader untuk komunitas yang berbeda
      if (existingLeader) {
        const existingCommunity = await CommunityModel.findByPk(existingLeader.id);
        code = 422;
        response = {
          success: false,
          status: "ERROR",
          message: `This user already lead ${existingCommunity.name} community`,
        };
      } else {
        // lanjut memeriksa komunitas yang sudah di bentuk pada daerah yang sama berdasarkan kode pos
        const existingCommunity = await CommunityModel.findOne({
          where: {
            postal_code: req.body.postal_code,
          },
        });

        // conditional statement untuk komunitas yang udah ada
        if (existingCommunity) {
          code = 422;
          response = {
            success: false,
            status: "ERROR",
            message: "Oops! A community already exist in this area.",
          };
          res.status(code).json(response);
          return;
        } else {
          // jika semua validasi passed, maka komunitas baru dapat dibuat
          const newCommunity = await CommunityModel.create({
            leader_id: req.body.leader_id,
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            image: req.body.image || null,
            postal_code: req.body.postal_code,
          });

          await CommunityUser.create({
            users_id: req.body.leader_id,
            communities_id: newCommunity.id,
            community_role: "leader",
          });

          response = {
            success: true,
            status: "SUCCESS",
            message: "New Community Created",
            data: newCommunity,
          };
          res.status(code).json(response);
          return;
        }
      }
    } catch (error) {
      res.status(422).json({
        success: false,
        message: "Error creating community",
        error: error.message,
      });
      return;
    }
  }
};

// UPDATE - PATCH
const updateCommunity = async (req, res) => {
  let response = {};
  let code = 200;

  if (req.body.leader_id == "" || req.body.leader_id == undefined) {
    code = 442;
    response = {
      success: false,
      status: "ERROR",
      message: "The leader_id property cannot be null",
    };
    res.status(code).json(response);
    return;
  } else if (req.body.name == "" || req.body.name == undefined) {
    code = 442;
    response = {
      success: false,
      status: "ERROR",
      message: "The name property cannot be null",
    };

    res.status(code).json(response);
    return;
  } else if (req.body.location == "" || req.body.location == undefined) {
    code = 442;
    response = {
      success: false,
      status: "ERROR",
      message: "The location property cannot be null",
    };

    res.status(code).json(response);
    return;
  } else if (req.body.description == "" || req.body.description == undefined) {
    code = 442;
    response = {
      success: false,
      status: "ERROR",
      message: "The description property cannot be null",
    };

    res.status(code).json(response);
    return;
  } else {
    try {
      const existingLeader = await CommunityModel.findOne({
        where: {
          leader_id: req.body.leader_id,
          id: {
            [Sequelize.Op.ne]: req.params.id, // mengecualikan id komunitas yang lagi diupdate
          },
        },
      });

      if (existingLeader) {
        const existingCommunity = await CommunityModel.findByPk(existingLeader.id);
        code = 422;
        response = {
          success: false,
          status: "ERROR",
          message: `This user already leads ${existingCommunity.name}`,
        };
        res.status(code).json(response);
        return;
      } else {
        const existingCommunity = await CommunityModel.findOne({
          where: {
            postal_code: req.body.postal_code,
            id: {
              [Sequelize.Op.ne]: req.params.id, // mengecualikan id komunitas yang lagi diupdate
            },
          },
        });

        if (existingCommunity) {
          code = 422;
          response = {
            success: false,
            status: "ERROR",
            message: "Oops! A community already exists in this area.",
          };

          res.status(code).json(response);
          return;
        } else {
          const community = await CommunityModel.findByPk(req.params.id);

          if (!community) {
            response = {
              success: false,
              status: "ERROR",
              message: "Data not found",
            };
            res.status(code).json(response);
            return;
          } else {
            community.leader_id = req.body.leader_id;
            community.name = req.body.name;
            community.location = req.body.location;
            community.description = req.body.description;
            community.image = req.body.image;
            community.postal_code = req.body.postal_code;

            await community.save();

            response = {
              success: true,
              status: "SUCCESS",
              message: "Community Updated Successfully",
              data: community,
            };
            res.status(code).json(response);
            return;
          }
        }
      }
    } catch (error) {
      code = 422;
      response = {
        success: false,
        status: "ERROR",
        message: "Error updating community",
        error: error.message,
      };
      res.status(code).json(response);
      return;
    }
  }
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
  deleteCommunity,
  getCommunityDetail,
};
