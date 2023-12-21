import prisma from "../DB/db.config.js";

export const createBookmark = async (req, res) => {
  try {
    const { customerId, newsId, videoNewsId, adminUserId } = req.body;

    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        bookmarkCount: {
          increment: 1,
        },
      },
    });

    const newBookmark = await prisma.bookmark.create({
      data: {
        customerId,
        newsId,
        videoNewsId,
        adminUserId,
      },
    });

    return res.json({
      status: 200,
      data: newBookmark,
      message: "Bookmark Created",
    });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// bookmark delete
export const deleteBookmark = async (req, res) => {
  const id = req.params.id;
  const newsId = req.params.newsId;

  await prisma.news.update({
    where: {
      id: newsId,
    },
    data: {
      bookmarkCount: {
        decrement: 1,
      },
    },
  });

  try {
    const deleteBookmark = await prisma.bookmark.delete({
      where: {
        id: id,
      },
    });

    return res.json({
      status: 200,
      data: deleteBookmark,
      message: "Bookmark Deleted",
    });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
