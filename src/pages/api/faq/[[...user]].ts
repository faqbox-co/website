import FaqFunctions from "@/database/faq";
import APIResponse from "@/interfaces/apiResponse";
import { NextApiRequest, NextApiResponse } from "next";

export default async function FaqApi(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  console.debug(`${req.method} FAQ API called.`, req.body);
  const method = (req.method ?? "GET").toLowerCase();

  if (!Object.keys(FaqFunctions).includes(method)) {
    return res.status(405).send({ ok: false, description: "Lamao" });
  }

  return FaqFunctions[method](req, res);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};
