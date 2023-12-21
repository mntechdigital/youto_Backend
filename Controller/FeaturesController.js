import prisma from "../DB/db.config.js";

export const createFeature = async (req, res) => {
  const { featuresName, subFeaturesName } = req.body;

  try {
    const createdFeature = await prisma.adminFeatures.create({
      data: {
        featuresName,
        AdminSubFeatures: {
          create: subFeaturesName.map((subFeatureName) => ({
            subFeaturesName: subFeatureName,
          })),
        },
      },
    });

    return res.json({
      status: 200,
      data: createdFeature,
      message: "Feature Created",
    });
  } catch (error) {
    console.error("Error creating feature:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find all feature with subfeatures
export const getAllFeatures = async (req, res) => {
  try {
    const getAllFeatures = await prisma.adminFeatures.findMany({
      include: {
        AdminSubFeatures: true,
      },
    });

    return res.json({
      status: 200,
      data: getAllFeatures,
      message: "All Features",
    });
  } catch (error) {
    console.error("Error getting all features:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};


// delete all features
export const deleteAllFeatures = async (req, res) => {
  try {
    const deleteAllFeatures = await prisma.adminFeatures.deleteMany();

    return res.json({
      status: 200,
      data: deleteAllFeatures,
      message: "All Features Deleted",
    });
  } catch (error) {
    console.error("Error deleting all features:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

