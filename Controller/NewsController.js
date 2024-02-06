import prisma from "../DB/db.config.js";

export const createNews = async (req, res) => {
  try {
    const { title, content, thumbnail, category, authorId, adminUserId } =
      req.body;

    if ((authorId && adminUserId) || (!authorId && !adminUserId)) {
      return res
        .status(400)
        .json({ error: "Provide either authorId or adminUserId" });
    }

    const newCategory = await prisma.categories.create({
      data: {
        name: category,
      },
    });

    const newNews = await prisma.news.create({
      data: {
        title,
        content,
        thumbnail,
        categoryId: newCategory.id,
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

// find all news
export const getNewsAll = async (req, res) => {
  try {
    const allNews = await prisma.news.findMany({
      skip: 0,
      take: 4,
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
    console.error("Error finding all news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const getNewsAllWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 4;
  const skip = (page - 1) * pageSize;
  const customerId = req.params.id;

  try {
    const news = await prisma.news.findMany({
      skip: skip,
      take: pageSize,
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
        Report: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
        Bookmark: {
          select: {
            id: true,
            customerId: true,
          },
          where: {
            customerId: customerId,
          },
        },
      },
    });

    const totalNewsCount = await prisma.news.count();

    const totalPages = Math.ceil(totalNewsCount / pageSize);

    return res.json({
      status: 200,
      data: news,
      totalPages: totalPages,
      currentPage: page,
      message: "Top News Found",
    });
  } catch (error) {
    console.log(`Error finding top news: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// news find unique
export const getNewsById = async (req, res) => {
  const id = req.params.id;

  try {
    const findNews = await prisma.news.findUnique({
      where: {
        id: id,
      },
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            customer: true,
            adminUser: true,
            ReplayComment: {
              include: {
                customer: true,
                adminUser: true,
              },
            },
          },
          orderBy: {
            created_at: "asc",
          },
        },
      },
    });

    if (!findNews) {
      return res.json({
        status: 400,
        message: "News not found. Please enter another id",
      });
    }

    return res.json({
      status: 200,
      data: findNews,
      message: "News Found",
    });
  } catch (error) {
    console.error("Error finding news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// news find latest all
export const getAllNews = async (req, res) => {
  try {
    const allNews = await prisma.news.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        adminUser: true,
        customer: true,
      },
    });

    return res.json({
      status: 200,
      data: allNews,
      message: "All News Found",
    });
  } catch (error) {
    console.error("Error finding all news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const getLatestNews = async (req, res) => {
  try {
    const allNews = await prisma.news.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: 4,
      include: {
        adminUser: true,
        customer: true,
      },
    });

    return res.json({
      status: 200,
      data: allNews,
      message: "All News Found",
    });
  } catch (error) {
    console.error("Error finding all news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// update news
export const updateNewsById = async (req, res) => {
  const id = req.params.id;
  const { title, content, thumbnail, category } = req.body;

  try {
    const updateNews = await prisma.news.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        thumbnail,
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

// delete news
export const deleteNewsById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteNews = await prisma.news.delete({
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

export const getSportNews = async (req, res) => {
  try {
    const sportNews = await prisma.news.findMany({
      where: {
        Category: "Sports",
      },
    });

    return res.json({
      status: 200,
      data: sportNews,
      message: "Sport News Found",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// news find all by category
export const getNewsByCategory = async (req, res) => {
  const category = req.params.category;
  const id = req.params.id;

  try {
    const findNews = await prisma.news.findMany({
      where: {
        category: category,
        NOT: {
          id: id,
        },
      },
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
      },
      take: 3,
    });

    if (!findNews) {
      return res.json({
        status: 400,
        message: "News not found. Please enter another id",
      });
    }

    return res.json({
      status: 200,
      data: findNews,
      message: "News Found",
    });
  } catch (error) {
    console.error("Error finding news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// Route to get top news by likes, comments, and share
export const getTopNews = async (req, res) => {
  try {
    const topLikes = await prisma.news.findFirst({
      orderBy: {
        LikeCount: "desc",
      },
    });

    const topComments = await prisma.news.findFirst({
      orderBy: {
        commentCount: "desc",
      },
    });

    const topShares = await prisma.news.findFirst({
      orderBy: {
        shareCount: "desc",
      },
    });

    return res.json({
      status: 200,
      data: {
        topLikes,
        topComments,
        topShares,
      },
      message: "Top News Found",
    });
  } catch (error) {
    console.error("Error finding top news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find all news by category
export const getAllNewsByCategory = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const categoryId = req.params.id;

  try {
    const findNews = await prisma.news.findMany({
      where: {
        categoryId: categoryId,
      },
      skip: skip,
      take: pageSize,
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
        Report: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
      },
    });

    if (!findNews) {
      return res.json({
        status: 400,
        message: "News not found. Please enter another id",
      });
    }

    const totalNewsCount = await prisma.news.count({
      where: {
        categoryId: categoryId,
      },
    });

    const totalPages = Math.ceil(totalNewsCount / pageSize);

    return res.json({
      status: 200,
      data: findNews,
      totalPages: totalPages,
      currentPage: page,
      message: "News Found",
    });
  } catch (error) {
    console.error("Error finding news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// LikeCount increment by 1 when user likes a news
export const incrementLikeCount = async (req, res) => {
  const id = req.params.id;

  try {
    const likeCount = await prisma.news.update({
      where: {
        id: id,
      },
      data: {
        LikeCount: {
          increment: 1,
        },
      },
    });

    return res.json({
      status: 200,
      data: likeCount,
      message: "Like Count Updated",
    });
  } catch (error) {
    console.error("Error updating like count:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// LikeCount Decrement by 1 when user unlike a news
export const decrementLikeCount = async (req, res) => {
  const id = req.params.id;

  try {
    const likeCount = await prisma.news.update({
      where: {
        id: id,
      },
      data: {
        LikeCount: {
          decrement: 1,
        },
      },
    });

    return res.json({
      status: 200,
      data: likeCount,
      message: "Like Count Updated",
    });
  } catch (error) {
    console.error("Error updating like count:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// top news
export const getTopNewsByCategoryWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  try {
    const topNews = await prisma.news.findMany({
      orderBy: {
        LikeCount: "desc",
      },
      skip: skip,
      take: pageSize,
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
        Report: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
      },
    });

    const totalNewsCount = await prisma.news.count();

    const totalPages = Math.ceil(totalNewsCount / pageSize);

    return res.json({
      status: 200,
      data: topNews,
      totalPages: totalPages,
      currentPage: page,
      message: "Top News Found",
    });
  } catch (error) {
    console.log(`Error finding top news: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
