import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
  try {
    const { customerId, adminUserId, newsId, comment, videoNewsId } = req.body;

    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    })

    const newComment = await prisma.comment.create({
      data: {
        customerId,
        adminUserId,
        newsId,
        comment,
        videoNewsId,
      },
    });

    return res.json({
      status: 200,
      data: newComment,
      message: "Comment Created",
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// comment delete
export const deleteComment = async (req, res) => {
  const id = req.params.id;
  const newsId = req.params.newsId;

  await prisma.news.update({
    where: {
      id: newsId,
    },
    data: {
      commentCount: {
        decrement: 1,
      },
    },
  })

  try {
    const deleteComment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return res.json({
      status: 200,
      data: deleteComment,
      message: "Comment Deleted",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// comment update
export const updateComment = async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;

  try {
    const updateComment = await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        comment,
      },
    });

    return res.json({
      status: 200,
      data: updateComment,
      message: "Comment Updated",
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};


 
