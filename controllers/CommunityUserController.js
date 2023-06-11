// write all related function to community_users entity down below
const { Sequelize } = require("sequelize");
const CommunityUserModel = require("../models").communityUser;
const UserModel = require("../models").user;

// READ - GET
const getAllCommunityMember = async (req, res) => {
  try {
    let communityId = req.params.id;

    const communityUsers = await CommunityUserModel.findAll({
      where: {
        communities_id: communityId,
      },
      attributes: ["id", "users_id"], // Include the id and users_id attributes
    });

    const usersIds = communityUsers.map((communityUser) => communityUser.users_id);

    const communityMembers = await UserModel.findAll({
      where: {
        id: usersIds,
      },
      attributes: ["name"],
    });

    const formattedCommunityMembers = communityMembers.map((member, index) => ({
      id: communityUsers[index].id,
      name: member.name,
      users_id: communityUsers[index].users_id,
    }));

    res.json({
      success: true,
      message: "Retrieved community members successfully",
      communityMembers: formattedCommunityMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving community members",
      error: error.message,
    });
  }
};

// CREATE - POST
const createNewCommunityUser = async (req, res) => {
  let response = {};
  let code = 200;

  if (req.body.users_id == "" || req.body.users_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the users_id property cannot be null",
    };
  } else if (req.body.communities_id == "" || req.body.communities_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the name communities_id cannot be null",
    };
  } else {
    try {
      // daftarkan anggota komunitas baru
      const newCommunityUser = await CommunityUserModel.create({
        users_id: req.body.users_id,
        communities_id: req.body.communities_id,
        community_role: "member",
      });

      response = {
        status: "SUCCESS",
        message: "Anda sudah terdaftar menjadi anggota komunitas ini",
        data: newCommunityUser,
      };
    } catch (error) {
      code = 422;
      response = {
        status: "ERROR",
        message: error.parent && error.parent.sqlMessage ? error.parent.sqlMessage : "Unknown error occurred",
      };
    }
  }

  res.status(code).json(response);
};

// DELETE - DELETE
const deleteCommunityMember = async (req, res) => {
  let response = {};
  let code = 200;

  const communityUserId = req.params.id;

  // hapus semua data member komunitas
  await CommunityUserModel.destroy({
    where: {
      id: communityUserId,
    },
  });

  response = {
    status: "SUCCESS",
    message: "The member succesfully deleted from this community",
  };
  res.status(code).json(response);
  return;
};

module.exports = {
  createNewCommunityUser,
  getAllCommunityMember,
  deleteCommunityMember,
};
