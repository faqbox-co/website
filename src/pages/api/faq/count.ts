import connect from "@/database/conn";
import APIResponse from "@/interfaces/apiResponse";
import UserModel from "@/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function UserCount(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  try {
    await connect();
    const total = await UserModel.estimatedDocumentCount();
    return res.status(200).send({
      ok: true,
      message: { total },
    });
  } catch {
    return res.status(500).send({
      ok: false,
      description: "Internal server error.",
    });
  }
}
