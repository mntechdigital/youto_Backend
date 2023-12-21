import prisma from "../DB/db.config.js";

// create customer
export const createCustomer = async (req, res) => {
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
          category: category.toString(), // Ensure category is a string
        })),
      },
    },
  });

  return res.json({ status: 200, data: newUser, message: "User Created" });
};

// // get all users
// export const getAllUsers = async (req, res) => {
//   const getAllUsers = await prisma.user.findMany();
//   return res.json({ status: 200, data: getAllUsers, message: "All Users" });
// };

// // get user by id
// export const getUserById = async (req, res) => {
//   const id = req.params.id;
//   const getUserById = await prisma.user.findFirst({
//     where: {
//       id: `${id}`,
//     },
//   });
//   return res.json({ status: 200, data: getUserById, message: "User Found" });
// };

// // update user by id
// export const updateUserById = async (req, res) => {
//   const id = req.params.id;
//   const { name, email, photo, password } = req.body;

//   const updateUserById = await prisma.user.update({
//     where: {
//       id: `${id}`,
//     },
//     data: {
//       name,
//       email,
//       photo,
//       password,
//     },
//   });
//   return res.json({
//     status: 200,
//     data: updateUserById,
//     message: "User Updated",
//   });
// };

// // delete user by id
// export const deleteUserById = async (req, res) => {
//   const id = req.params.id;
//   const deleteUserById = await prisma.user.delete({
//     where: {
//       id: `${id}`,
//     },
//   });

//   return res.json({
//     status: 200,
//     data: deleteUserById,
//     message: "User Deleted",
//   });
// };
