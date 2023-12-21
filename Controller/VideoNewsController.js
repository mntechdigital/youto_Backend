import prisma from "../DB/db.config.js";

export const createVideoNews = async (req, res) => {
  try {
    const {
      title,
      content,
      thumbnail,
      videoUrl,
      category,
      authorId,
      adminUserId,
    } = req.body;

    const newNews = await prisma.videoNews.create({
      data: {
        title,
        content,
        thumbnail,
        videoUrl,
        category,
        authorId,
        adminUserId,
      },
    });

    return res.json({
      status: 200,
      data: newNews,
      message: "News Created",
    });
  } catch (error) {
    console.error("Error creating news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find video news 6 items
export const getVideoNews = async (req, res) => {
  try {
    const allNews = await prisma.videoNews.findMany({
      skip: 0,
      take: 6,
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            adminUser: true,
            customer: true,
          },
        },
      },
    });

    return res.json({
      status: 200,
      data: allNews,
      message: "All News Found",
    });
  } catch (error) {
    console.error("Error getting all news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find single video news by id
export const getVideoNewsById = async (req, res) => {
  try {
    const id = req.params;

    const singleNews = await prisma.videoNews.findUnique({
      where: {
        id: id,
      },
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            adminUser: true,
            customer: true,
          },
        },
      },
    });

    return res.json({
      status: 200,
      data: singleNews,
      message: "Single News Found",
    });
  } catch (error) {
    console.error("Error getting single news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// update video news by id
export const updateVideoNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, thumbnail, videoUrl, category } = req.body;

    const updateNews = await prisma.videoNews.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        thumbnail,
        videoUrl,
        category,
      },
    });

    return res.json({
      status: 200,
      data: updateNews,
      message: "News Updated",
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// delete video news by id
export const deleteVideoNewsById = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteNews = await prisma.videoNews.delete({
      where: {
        id: id,
      },
    });

    return res.json({
      status: 200,
      data: deleteNews,
      message: "News Deleted",
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
