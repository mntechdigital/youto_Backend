import prisma from "../DB/db.config.js";

export const createAdminUser = async (req, res) => {
  const { name, email, password, contactNumber, image, roleId } = req.body;

  try {
    const findAdminUser = await prisma.adminUser.findUnique({
      where: {
        email: email,
      },
    });

    if (findAdminUser) {
      return res.json({
        status: 400,
        message: "Email Already Taken. Please enter another email",
      });
    }

    const newAdminUser = await prisma.adminUser.create({
      data: {
        name,
        email,
        password,
        contactNumber,
        image,
        roleId,
      },
    });

    return res.json({
      status: 200,
      data: newAdminUser,
      message: "Admin User Created",
    });
  } catch (error) {
    console.error("Error deleting all features:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// adminUser find unique
export const getAdminUserByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const findAdminUser = await prisma.adminUser.findUnique({
      where: {
        email: email,
      },
      include: {
        role: {
          include: {
            AdminFeatures: {
              orderBy: {
                index: "asc",
              },
              include: {
                AdminSubFeatures: true,
              },
            },
          },
        },
      },
    });

    if (!findAdminUser) {
      return res.json({
        status: 400,
        message: "Email not found. Please enter another email",
      });
    }

    return res.json({
      status: 200,
      data: findAdminUser,
      message: "Admin User Found",
    });
  } catch (error) {
    console.error("Error deleting all features:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const getCurrentUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const findAdminUser = await prisma.adminUser.findUnique({
      where: {
        email: email,
      },
    });

    const findCustomerUser = await prisma.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (findAdminUser) {
      return res.json({
        status: 200,
        data: {
          ...findAdminUser,
          role: "admin",
        },
        message: "Current User Found",
      });
    } else if (findCustomerUser) {
      return res.json({
        status: 200,
        data: findCustomerUser,
        message: "Current User Found",
      });
    } else {
      return res.json({
        status: 400,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(`Error getting current user: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// get current user id by email
export const getCurrentUserIdByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const findAdminUser = await prisma.adminUser.findUnique({
      where: {
        email: email,
      },
    });

    const findCustomer = await prisma.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (findAdminUser) {
      return res.json(findAdminUser.id);
    } else if (findCustomer) {
      res.json(findCustomer.id);
    } else {
      return res.json(null);
    }
  } catch (error) {
    console.error("Error deleting all features:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// get role by email
export const getCurrentRoleByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const findAdminUser = await prisma.adminUser.findUnique({
      where: {
        email: email,
      },
    });

    const findCustomer = await prisma.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (findAdminUser) {
      return res.json("admin");
    } else if (findCustomer) {
      return res.json("customer");
    } else {
      return res.json(null);
    }
  } catch (error) {
    console.error("Error deleting all features:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
