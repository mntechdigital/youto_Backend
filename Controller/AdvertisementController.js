import prisma from "../DB/db.config.js";

export const createAdvertisement = async (req, res) => {
  try {
    const { image, title } = req.body;

    const newAdvertisement = await prisma.advertisement.create({
      data: {
        image,
        title,
      },
    });

    return res.send({
      status: 200,
      data: newAdvertisement,
      message: "Advertisement Created",
    });
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find all advertisement
export const getAllAdvertisement = async (req, res) => {
  try {
    const allAdvertisement = await prisma.advertisement.findMany();

    return res.json({
      status: 200,
      data: allAdvertisement,
      message: "All Advertisement",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find advertisement by id
export const getAdvertisementById = async (req, res) => {
  const id = req.params.id;

  try {
    const findAdvertisement = await prisma.advertisement.findUnique({
      where: {
        id: id,
      },
    });

    return res.json({
      status: 200,
      data: findAdvertisement,
      message: "Advertisement Found",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// update advertisement by id
export const updateAdvertisementById = async (req, res) => {
  const id = req.params.id;
  const { image, name } =
    req.body;

  try {
    const updateAdvertisement = await prisma.advertisement.update({
      where: {
        id: id,
      },
      data: {
        image, 
        name
      },
    });

    return res.json({
      status: 200,
      data: updateAdvertisement,
      message: "Advertisement Updated",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// delete advertisement by id
export const deleteAdvertisementById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteAdvertisement = await prisma.advertisement.delete({
      where: {
        id: id,
      },
    });

    return res.json({
      status: 200,
      data: deleteAdvertisement,
      message: "Advertisement Deleted",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
