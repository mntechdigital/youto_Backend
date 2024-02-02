import prisma from "../DB/db.config.js";

// create customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, image, password, age, gender, preferences } = req.body;

    const findUser = await prisma.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      return res.json({
        status: 400,
        message: "Email Already Taken. Please enter another email",
      });
    }

    const newUser = await prisma.customer.create({
      data: {
        name,
        email,
        image,
        password,
        age,
        gender,
        preferences: {
          create: preferences.map((category) => ({
            categoryId: category.id,
          })),
        },
      },
    });

    return res.json({ status: 200, data: newUser, message: "User Created" });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Server Error",
      error: error.message,
    });
  }
};

// get customer by id
export const getCustomerById = async (req, res) => {
  const id = req.params.id;
  try {
    const getCustomerById = await prisma.customer.findUnique({
      where: {
        id: id,
      },
      include: {
        preferences: {
          include: {
            Category: true,
          },
        },
      },
    });
    return res.json({
      status: 200,
      data: getCustomerById,
      message: "User Found",
    });
  } catch (error) {
    console.log(`Error getting customer by id: ${error.message}`);
    return res.json({
      status: 500,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getCategoriesNameWithoutDuplicateByCustomerId = async (
  req,
  res
) => {
  const id = req.params.id;
  try {
    const preferences = await prisma.preference.findMany({
      where: {
        customerId: id,
      },
      select: {
        Category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    const categories = preferences.map((preference) => preference.Category);
    const distinctCategories = Array.from(
      new Set(categories.map((category) => category.id))
    ).map((id) => {
      return categories.find((category) => category.id === id);
    });

    return res.json({
      status: 200,
      data: distinctCategories,
      message: "User Found",
    });
  } catch (error) {
    console.log(`Error getting customer by id: ${error.message}`);
    return res.json({
      status: 500,
      message: "Server Error",
      error: error.message,
    });
  }
};