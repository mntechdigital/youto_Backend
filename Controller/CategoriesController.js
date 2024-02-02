import prisma from "../DB/db.config.js";

export const getCategoriesWithoutDuplicate = async (req, res) => {
  try {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
      },
      distinct: ["name"],
    });

    res.json({
      status: 200,
      data: categories,
      message: "Categories without duplicate",
    });
  } catch (error) {
    console.log(`Error getting categories without duplicate: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
