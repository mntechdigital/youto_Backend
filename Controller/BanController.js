import prisma from "../DB/db.config.js";


export const createBan = async (req, res) => {
    try {
        const { customerId, newsId, videoNewsId } = req.body;

        // if already banned then return
        const findBan = await prisma.ban.findFirst({
            where: {
                customerId,
                newsId,
            },
        });

        if (findBan) {
            return res.json({
                status: 400,
                message: "Already Banned",
            });
        }

        const newBan = await prisma.ban.create({
            data: {
                customerId,
                newsId,
                videoNewsId,
            },
        });

        return res.json({
            status: 200,
            data: newBan,
            message: "Ban Created",
        });      
    } catch (error) {
        console.log(`Error creating ban: ${error}`);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};