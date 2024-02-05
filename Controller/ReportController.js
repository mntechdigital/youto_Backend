import prisma from "../DB/db.config.js";

export const createReport = async (req, res) => {
  const { newsId, customerId, adminUserId, videoNewsId, responses } = req.body;

  try {
    // if reportCount is is equal to 20 then delete the news
    const news = await prisma.news.findFirst({
      where: {
        id: newsId,
      },
    });

    if (news.ReportCount === 20) {
      await prisma.news.delete({
        where: {
          id: newsId,
        },
      });

      return res.json({
        status: 200,
        message: "News Deleted",
      });
    }

    // check this customer already report this news then return
    const findReport = await prisma.report.findFirst({
      where: {
        newsId,
        customerId,
      },
    });

    if (findReport) {
      return res.json({
        status: 400,
        message: "You already reported this news",
      });
    }

    // increment report count
    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        ReportCount: {
          increment: 1,
        },
      },
    });

    const newReport = await prisma.report.create({
      data: {
        newsId,
        customerId,
        adminUserId,
        videoNewsId,
        ReportReason: {
          create: responses.map((response) => ({
            reason: response.reason,
          })),
        },
      },
      include: {
        ReportReason: true,
      },
    });

    return res.json({
      status: 200,
      data: newReport,
      message: "Report Created",
    });
  } catch (error) {
    console.log(`Error creating report: ${error.message}`);
    return res.json({
      status: 500,
      message: "Server Error",
      error: error.message,
    });
  }
};
