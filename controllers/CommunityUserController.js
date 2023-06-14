// write all related function to community_users entity down below
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
  let communityId = req.params.id;

  // validasi users_id
  if (req.body.users_id == "" || req.body.users_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "The users_id property cannot be null",
    };
    res.status(code).json(response);
    return;
  }

  try {
    // mengambil data yang value communities_id dan users_id sama seperti request
    const existingCommunityUser = await CommunityUserModel.findOne({
      where: {
        communities_id: communityId,
        users_id: req.body.users_id,
      },
    });

    // validasi agar users_id tidak terdaftar dalam >1 komunitas yang sama
    if (existingCommunityUser) {
      response = {
        success: false,
        status: "ERROR",
        message: "A community user with the same communities_id and users_id already exists",
      };
      res.status(422).json(response);
      return;
    }

    // mengambil data komunitas yang leader_id nya sesuai sama dengan request users_id
    const existingLeader = await CommunityUserModel.findOne({
      where: {
        users_id: req.body.users_id,
        community_role: "leader",
      },
    });

    // validasi agar users_id yang sama tidak menjadi leader >1 komunitas
    if (req.body.community_role === "leader" && existingLeader) {
      response = {
        status: "ERROR",
        message: "This user is already a leader in another community!",
      };
      res.status(422).json(response);
      return;
    }

    // mendaftarkan member komunitas yang baru
    const newCommunityUser = await CommunityUserModel.create({
      users_id: req.body.users_id,
      communities_id: communityId,
      community_role: req.body.community_role || "member",
    });

    response = {
      success: true,
      message: "You have been successfully registered as a member of this community",
      data: newCommunityUser,
    };
    res.status(code).json(response);
  } catch (error) {
    code = 422;
    response = {
      success: false,
      status: "ERROR",
      message: error.parent && error.parent.sqlMessage ? error.parent.sqlMessage : "Unknown error occurred",
    };
    res.status(code).json(response);
  }
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
