import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
  const { customerId, adminUserId, newsId, comment, videoNewsId } = req.body;
  try {
    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });

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

// get new comments by news id
export const getCommentsNewByNewsId = async (req, res) => {
  const newsId = req.params.id;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        newsId: newsId,
      },
      include: {
        ReplayComment: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.json({
      status: 200,
      data: comments,
      message: "Comments Fetched",
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// get old comments by news id
export const getCommentsOldByNewsId = async (req, res) => {
  const newsId = req.params.id;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        newsId: newsId,
      },
      include: {
        ReplayComment: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });

    return res.json({
      status: 200,
      data: comments,
      message: "Comments Fetched",
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
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
  });

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

// create the replay comment
export const createReplayComment = async (req, res) => {
  const { commentId, customerId, adminUserId, replay } = req.body;

  try {
    const newReplayComment = await prisma.replayComment.create({
      data: {
        commentId,
        customerId,
        adminUserId,
        replay,
      },
    });

    return res.json({
      status: 200,
      data: newReplayComment,
      message: "Replay Comment Created",
    });
  } catch (error) {
    console.log(`Error creating replay comment: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// update the replay comment with customer id and replay comment id
export const updateReplayComment = async (req, res) => {
  const id = req.params.id;
  const { customerId, replay } = req.body;

  try {
    const updateReplayComment = await prisma.replayComment.update({
      where: {
        id: id,
        customerId: customerId,
      },
      data: {
        replay,
      },
    });

    return res.json({
      status: 200,
      data: updateReplayComment,
      message: "Replay Comment Updated",
    });
  } catch (error) {
    console.log(`Error updating replay comment: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// delete the replay comment with customer id and replay comment id
export const deleteReplayComment = async (req, res) => {
  const id = req.params.id;
  const customerId = req.query.customerId;

  try {
    const deleteReplayComment = await prisma.replayComment.delete({
      where: {
        id: id,
        customerId: customerId,
      },
    });

    return res.json({
      status: 200,
      data: deleteReplayComment,
      message: "Replay Comment Deleted",
    });
  } catch (error) {
    console.log(`Error deleting replay comment: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
