import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import TypeUserData from "@/types/user-data";
import APIResponse from "@/types/apiResponse";
import connect from "./conn";
import faqModel, { IMFaq } from "@/models/faq.model";
import TypeFaq from "@/types/faq";
import CustomSession from "@/types/custom-session";
import TypeLink from "@/types/link";
import crypto from "node:crypto";
import Sharp from "sharp";
import pictureModel from "@/models/picture.model";

function isData(obj: any): obj is TypeFaq {
  return "id" in obj && "q" in obj && "a" in obj;
}

function isLink(obj: any): obj is TypeLink {
  return "id" in obj && "url" in obj && "title" in obj && "urlType" in obj;
}

export async function getFaqData(
  username: string
): Promise<TypeUserData | null> {
  if (!username) return null;

  await connect();

  const faqs = await faqModel.findOne({
    username: username,
  });

  if (!faqs) {
    return null;
  }

  let ret: TypeUserData = {
    username: "",
    theme: "",
    title: "",
    imageHash: null,
    email: "",
    data: [],
    faqs: [],
    links: [],
  };

  const $ = faqs as IMFaq & { _doc: IMFaq };
  const { _id, faqs: userFaqs, links, ..._doc } = $._doc;
  ret = { ...ret, ..._doc };

  userFaqs.forEach((d) => {
    ret.faqs.push({
      id: d.id,
      q: d.q,
      a: d.a,
    });
  });

  links.forEach((link) => {
    ret.links.push({
      id: link.id,
      url: link.url,
      urlType: link.urlType,
      title: link.title,
    });
  });

  return ret;
}

async function getFaq(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  const query = req.query;
  let user = query.user;

  if (!user) {
    return res
      .status(400)
      .send({ ok: false, description: "Bad Request: user not specified." });
  }

  if (!Array.isArray(user)) {
    return res.status(400).send({
      ok: false,
      description: "Bad Request: Invalid query.",
    });
  }

  const faqs = await getFaqData(user[0]);

  if (!faqs) {
    return res.status(404).send({
      ok: false,
      description: "Requested data not found.",
    });
  }

  return res.status(200).send({
    ok: true,
    message: { ...faqs },
  });
}

async function createFaq(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  await connect();
  const token = (await getToken({ req })) as
    | (CustomSession["user"] & { username: CustomSession["username"] })
    | null;

  if (!token) {
    return res.status(401).send({
      ok: false,
      description: "Unauthorized.",
    });
  }

  if (!token.username) {
    return res.status(400).send({
      ok: false,
      description: "Bad Request: Session has no username",
    });
  }

  const body = req.body as (TypeUserData & { image: string }) | null;

  if (!body) {
    return res.status(400).send({
      ok: false,
      description: "Empty body.",
    });
  }

  let datas: { messages: string[]; [key: string]: any } = {
    messages: [],
  };
  const exist = await faqModel.findOne({
    username: token.username,
  });

  if (body.data) {
    if (!Array.isArray(body.data)) datas.data = [];
    else {
      const pushData: any[] = [];
      let ignored = 0;

      body.data.forEach((data) => {
        if (!isData(data)) {
          ignored++;
          return;
        }
        let tmp: TypeFaq = { id: "", q: "", a: "" };
        tmp["id"] = data.id;
        tmp["q"] = data.q;
        tmp["a"] = data.a;
        pushData.push(tmp);
      });

      datas.data = pushData;
      datas.data_ignored = ignored;
    }
  }

  if (body.links) {
    if (!Array.isArray(body.links)) datas.links = [];
    else {
      const pushData: any[] = [];
      let ignored = 0;

      body.links.forEach((link) => {
        if (!isLink(link)) {
          ignored++;
          return;
        }
        let tmp: TypeLink = { id: "", url: "", title: "", urlType: "" };
        tmp["id"] = link.id;
        tmp["url"] = link.url;
        tmp["title"] = link.title;
        tmp["urlType"] = link.urlType;
        pushData.push(tmp);
      });

      datas.links = pushData;
      datas.links_ignored = ignored;
    }
  }

  if (body.image !== null && body.image !== undefined) {
    if (!body.image) {
      datas.imageHash = "";
      const pictureFound = await pictureModel.findOne({
        hash: exist?.imageHash,
      });
      if (pictureFound) {
        await pictureFound.updateOne({
          users: pictureFound.users.filter((user) => user !== exist?.username),
        });
      }
    } else {
      const image = Buffer.from(body.image, "base64");

      try {
        const img = Sharp(image);
        const imgBuffer = await img.toBuffer();
        const imgHash = crypto
          .createHash("sha512")
          .update(imgBuffer)
          .digest("hex");

        const pictureFound = await pictureModel.findOne({
          hash: imgHash,
        });

        if (pictureFound) {
          if (!pictureFound.users.includes(token.username)) {
            await pictureFound.updateOne({
              users: [...pictureFound.users, token.username],
            });
          }
        } else {
          const newPicture = new pictureModel({
            users: [token.username],
            hash: imgHash,
            data: imgBuffer,
            contentType: `image/${(await img.metadata()).format}`,
          });
          await newPicture.save();
        }

        datas.imageHash = imgHash;
      } catch {
        datas.messages.push("Unsupported image format");
      }
    }
  }
  if (body.title !== null || body.title !== undefined) {
    datas.title = body.title;
  }
  if (body.theme) {
    datas.theme = body.theme;
  }

  if (Object.keys(datas).length === 0) {
    return res.status(400).send({
      ok: false,
      description: "Incomplete body.",
    });
  }

  try {
    if (!exist) {
      const newFaq = new faqModel({
        username: token.username,
        email: token.email,
        ...datas,
      });
      await newFaq.save();
    } else {
      await exist.updateOne({
        ...datas,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      ok: false,
      description: "Internal Server Error.",
    });
  }

  return res.status(201).send({
    ok: true,
    message: { ...datas },
  });
}

async function delFaq(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  const query = req.query;
  const user = query.user;
  const id = query.id;

  if (!user) {
    return res
      .status(400)
      .send({ ok: false, description: "Bad Request: user not specified." });
  }

  if (!Array.isArray(user)) {
    return res.status(400).send({
      ok: false,
      description: "Bad Request: Invalid query.",
    });
  }

  if (!id)
    return res
      .status(400)
      .send({ ok: false, description: "Bad request: no id specified." });

  const found = await faqModel.findOne({
    _id: id,
  });

  if (!found) {
    return res.status(404).send({
      ok: false,
      description: `FAQ with id ${id} not found.`,
    });
  } else {
    const deleted = await found.deleteOne();
    return res.status(202).send({
      ok: true,
      message: "Deleted.",
    });
  }
}

const FaqFunctions: {
  [key: string]: (
    req: NextApiRequest,
    res: NextApiResponse<APIResponse>
  ) => Promise<void>;
} = {
  get: getFaq,
  post: createFaq,
  delete: delFaq,
};

export default FaqFunctions;
