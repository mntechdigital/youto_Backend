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
