import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import IFaq from "@/interfaces/faq";

import APIResponse from "@/interfaces/apiResponse";
import connect from "./conn";
import faqModel, { IMFaq } from "@/models/faq.model";
import IData from "@/interfaces/data";
import CustomSession from "@/@types/custom_session";
import pictureModel from "@/models/picture.model";

function isData(obj: any): obj is IData {
  return "id" in obj && "q" in obj && "a" in obj;
}

export async function getFaqData(username: string): Promise<IFaq | null> {
  if (!username) return null;
  
  const faqs = await faqModel.findOne({
    username: username,
  });

  if (!faqs) {
    return null;
  }

  let ret: IFaq = {
    username: "",
    title: "",
    theme: "",
    image: "",
    email: "",
    data: [],
  };

  const $ = faqs as IMFaq & { _doc: IMFaq };
  const { _id, data, ..._doc } = $._doc;
  ret = { ...ret, ..._doc };

  data.forEach((d) => {
    ret.data.push({
      id: d.id,
      q: d.q,
      a: d.a,
    });
  });

  return ret;
}

async function getFaq(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  await connect();

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

  const body = req.body as IFaq | null;

  if (!body) {
    return res.status(400).send({
      ok: false,
      description: "Empty body.",
    });
  }

  let datas: { [key: string]: any } = {};

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
        let tmp: IData = { id: "", q: "", a: "" };
        tmp["id"] = data.id;
        tmp["q"] = data.q;
        tmp["a"] = data.a;
        pushData.push(tmp);
      });

      datas.data = pushData;
      datas.ignored = ignored;
    }
  }

  if (body.image !== null || body.image !== undefined) {
    const image = body.image as string;
    const pfound = await pictureModel.findOne({
      name: token.username,
    });

    if (image === "") {
      if (pfound) {
        await pfound.updateOne({
          data: "",
        });
      }
      datas.image = "";
    } else {
      if (!pfound) {
        const pnew = new pictureModel({
          name: token.username,
          data: body.image,
        });
        await pnew.save();
      } else {
        await pfound.updateOne({
          data: body.image,
        });
      }

      datas.image = `/api/images/${token.username}`;
    }
  }
  if (body.title) {
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
    const exist = await faqModel.findOne({
      username: token.username,
    });

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
};

export default FaqFunctions;
