import fs from "fs";
import { S3 } from "@aws-sdk/client-s3";
import formidable from "formidable";
import { type NextApiRequest, type NextApiResponse } from "next";

interface StorageService {
  uploadFile(file: formidable.File): Promise<string>;
}

class S3StorageService implements StorageService {
  private s3Client: S3;

  constructor() {
    this.s3Client = new S3({
      endpoint: process.env.DO_SPACES_URL,
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.DO_SPACES_ID ?? "",
        secretAccessKey: process.env.DO_SPACES_SECRET ?? "",
      },
    });
  }

  async uploadFile(file: formidable.File): Promise<string> {
    const originalFilename = file.originalFilename ?? "";
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const newFilename = `${originalFilename}-${timestamp}`;

    await this.s3Client.putObject({
      Bucket: process.env.DO_SPACES_BUCKET ?? "",
      Key: newFilename,
      Body: fs.readFileSync(file.filepath),
      ACL: "public-read",
    });

    return `https://${process.env.DO_SPACES_BUCKET ?? ""}.${
      process.env.DO_SPACES_URL?.replace(/^https:\/\//, "") ?? ""
    }/${newFilename}`;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable();
  const storageService: StorageService = new S3StorageService();

  form.parse(req, async (err, fields, files) => {
    const file = files.image?.[0];

    try {
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const url = await storageService.uploadFile(file);

      res.status(200).json({
        data: { url },
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("No file uploaded");
    }
  });
}
