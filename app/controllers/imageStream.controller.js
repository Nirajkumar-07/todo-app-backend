const supabse = require("../config/supabase.config");
const { Readable } = require("stream");

async function imageStream(req, res) {
  try {
    const filename = req.params.filename;

    const { data, error } = await supabse.storage
      .from("Uploads")
      .download(filename);

    if (error || !data) {
      return res.status(404).json({ error: "File not found" });
    }

    res.setHeader("Content-Type", data.type);
    Readable.fromWeb(data.stream()).pipe(res);
  } catch (error) {
    return res.status(404).json({ error: "Failed to fetch file" });
  }
}

module.exports = { imageStream };
