// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { EMAIL_BEM } from "../../constants";

type ReqBody = {
  nama: string;
  email: string;
  pesan: string;
  jurusan: {
    id: number;
    nama: string;
  };
  tipe: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const body = req.body as ReqBody;
      const OAuth2 = google.auth.OAuth2;

      const oauth2Client = new OAuth2({
        clientId: process.env.OAUTH2_CLIENT_ID,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET,
        redirectUri: `/aduan-dan-aspirasi`,
      });

      oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
      });

      const accessToken = await oauth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        // @ts-ignore
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: EMAIL_BEM,
          clientId: process.env.OAUTH2_CLIENT_ID,
          clientSecret: process.env.OAUTH2_CLIENT_SECRET,
          refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
          accessToken: accessToken,
        },
        secure: true,
        tls: { rejectUnauthorized: false },
      });

      const messageInfo = transporter.sendMail({
        from: EMAIL_BEM,
        to: EMAIL_BEM,
        subject: `Terdapat ${body.tipe} Baru!`,
        html: `
          <h3>${body.tipe} Baru di Situs Web BEM FASILKOM UPN "Veteran" Jawa Timur</h3>
          <p>Nama: ${body.nama}</p>
          <p>Email: ${body.email}</p>
          <p>Program studi: ${body.jurusan.nama}</p>
          <p>Pesan:</p>
          <p>${body.pesan}</p>
        `,
      });

      res.status(200).json({ accepted: (await messageInfo).accepted });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error });
    }
  }
}
