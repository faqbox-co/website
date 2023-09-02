import connect from "@/database/conn";
import APIResponse from "@/types/apiResponse";
import faqModel from "@/models/faq.model";
import pictureModel from "@/models/picture.model";
import UserModel from "@/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function imageHandler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse | Buffer>
) {
  const query = req.query.image;

  if ("refresh" in req.query) {
    connect();
    const pictures = await pictureModel.find();
    pictures.forEach(async (pic) => {
      const img = pic.hash;
      pic.users.forEach(async (usr) => {
        const user = await faqModel.findOne({
          username: usr,
        });
        await user?.updateOne({
          imageHash: img,
        });
      });
    });
    return res.status(200).send({ ok: true, message: "OK" });
  }

  if (typeof query !== "string") {
    return res
      .status(500)
      .send({ ok: false, description: "Internal Server Error." });
  }

  connect();
  const found = await pictureModel.findOne({
    hash: query,
  });

  if (!found)
    return res
      .status(404)
      .send({ ok: false, description: "Requested image not found." });

  const img = found.data;
  if (!img)
    return res
      .status(404)
      .send({ ok: false, description: "Requested user has no image found." });

  // Trying buff first
  const size = img.byteLength;
  res.setHeader("Content-Length", size);
  res.setHeader("Content-Type", found.contentType);
  if ("download" in req.query)
    res.setHeader("Content-Disposition", `attachment`);

  res.status(200).send(img);
}
