import connect from "@/database/conn";
import APIResponse from "@/interfaces/apiResponse";
import faqModel from "@/models/faq.model";
import { NextApiRequest, NextApiResponse } from "next";

export async function update(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
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
  return res.status(404).send({
    ok: false,
    description: "Safe",
  });
}
