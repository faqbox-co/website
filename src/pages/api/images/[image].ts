import connect from "@/database/conn";
import APIResponse from "@/interfaces/apiResponse";
import faqModel from "@/models/faq.model";
import pictureModel from "@/models/picture.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function imageHandler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse | Buffer>
) {
  const query = req.query.image;

  if ("refresh" in req.query) {
    connect();
    const users = await faqModel.find();
    users.forEach(async (user) => {
      const img = user.image;
      if (!img) return;
      const picture = new pictureModel({
        name: user.username,
        data: img,
      });
      await user.updateOne({
        image: "/api/images/" + user.username,
      });
      await picture.save();
    });
    return res.status(200).send({ ok: true, message: "OK" });
  }

  if (typeof query !== "string") {
    return res
      .status(500)
      .send({ ok: false, description: "Internal Server Error." });
  }

  connect();
  const test = await pictureModel.findOne({
    name: query,
  });

  if (!test) return res.status(404).send({ ok: false, description: "Nani?" });

  const img = test.data;
  if (!img)
    return res.status(404).send({ ok: false, description: "No gambar." });

  const imgSplit = img.split(",");
  const imgFormat = imgSplit[0].split(";")[0].split(":")[1];
  const imgBuff = imgSplit[1];

  const buff = Buffer.from(imgBuff, "base64");

  // Trying buff first
  const size = buff.byteLength;
  res.setHeader("Content-Type", imgFormat);
  res.setHeader("Content-Length", size);
  if ("download" in req.query)
    res.setHeader("Content-Disposition", `attachment`);

  res.status(200).send(buff);
}
