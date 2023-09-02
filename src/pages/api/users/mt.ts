import connect from "@/database/conn";
import APIResponse from "@/types/apiResponse";
import faqModel from "@/models/faq.model";
import pictureModel from "@/models/picture.model";
import { NextApiRequest, NextApiResponse } from "next";
import UserPictures from "../../../../../../test.pictures.json";
import crypto from "node:crypto";

async function image(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse | Buffer>
) {
  await connect();
  const pictures = await pictureModel.find({});

  // for (const pic of UserPictures) {
  for (let i = 0; i < UserPictures.length; i++) {
    const pic = UserPictures[i];
    console.log(pic.name);
    const data = pic.data;

    if (!data) continue;
    const imgSplit = data.split(",");
    const imageBuffer = imgSplit[1];
    const imageType = imgSplit[0].split(";")[0].split(":")[1];
    const buff = Buffer.from(imageBuffer, "base64");
    // console.log(buff);

    await pictures[i].updateOne({
      data: buff,
      contentType: imageType,
      hash: imageBuffer
        ? crypto.createHash("sha512").update(buff).digest("hex")
        : "",
      users: [pic.name],
      $unset: { name: 1 },
    });
    console.log("Done (?)");
  }

  return res.status(200).send({
    ok: true,
    message: "Dun :3",
  });
}

async function faq(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  await connect();
  const faqs = await faqModel.find({});
  const names: string[] = [];

  UserPictures.forEach((user) => {
    names.push(user.name);
  });

  for (const faq of faqs) {
    console.log(faq.username);
    const idx = names.indexOf(faq.username);
    const imageHash =
      idx === -1
        ? ""
        : UserPictures[idx].data
        ? crypto
            .createHash("sha512")
            .update(Buffer.from(UserPictures[idx].data.split(",")[1]))
            .digest("hex")
        : "";

    // faq.imageHash = imageHash;
    // faq.image = undefined;

    // await faq.save();

    await faq.updateOne({
      imageHash: imageHash,
    });
  }

  return res.status(200).send({
    ok: true,
    message: "Dun :3",
  });
}

async function faq2(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  await connect();
  await faqModel.updateMany(
    {},
    {
      $rename: { data: "faqs" },
      $unset: { image: 1 },
    }
  );

  return res.status(200).send({
    ok: true,
    message: "OK",
  });
}

async function image2(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  await connect();
  const pics = await pictureModel.find();

  for (const pic of pics) {
    console.log(pic.users);
    for (const user of pic.users) {
      const found = await faqModel.findOne({
        username: user,
      });
      await found?.updateOne({
        imageHash: pic.hash,
      });
    }
  }

  return res.status(200).send({
    ok: true,
    message: "OK",
  });
}

async function update(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  await connect();
  const faqs = await faqModel.find({});

  for (const faq of faqs) {
    console.log(faq.username, faq.email);
    if (Array.isArray(faq.links)) {
      console.log("Already has links");
    }
    await faq.updateOne({
      links: Array(),
    });
    console.log("DONE");
  }

  return res.status(200).send({
    ok: true,
    message: faqs.map((faq) => faq.links),
  });
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  console.log(_.query);
  const secret = _.query.secret as string;

  if (secret !== process.env.NEXTAUTH_SECRET) {
    return res.status(404).send({
      ok: false,
      description: "Denied.",
    });
  }

  const query = _.query.query as string;

  if (query === "update") {
    return await update(_, res);
  }
  if (query === "image") {
    return await image(_, res);
  }
  if (query === "faq") {
    return await faq(_, res);
  }

  if (query === "faq2") {
    return await faq2(_, res);
  }

  if (query === "image2") {
    return await image2(_, res);
  }

  return res.status(400).send({
    ok: false,
    description: "No query.",
  });
}
