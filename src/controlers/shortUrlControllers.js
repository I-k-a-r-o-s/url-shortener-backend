import { errorResponse } from "../helpers/response.js";
import ShortUrlModel from "../models/shortUrlModel.js";

export const createUrl = async (req, res) => {
  try {
    const { fullUrl } = req.body;

    const urlFound = await ShortUrlModel.findOne({ fullUrl });
    if (urlFound) {
      return res.status(409).json({
        success: false,
        message: "URL already exists!",
        urlFound,
      });
    }

    const shortUrl = await ShortUrlModel.create({ fullUrl });
    return res.status(201).json({
      success: true,
      message: "Successfully created the URL!",
      shortUrl,
    });
  } catch (error) {
    return errorResponse(res, "createUrl", error);
  }
};

export const getAllUrl = async (req, res) => {
  try {
    const shortUrls = await ShortUrlModel.find().sort({ createdAt: -1 });
    if (!shortUrls) {
      return res.status(404).json({
        success: false,
        message: "No URLs found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched URLs!",
      shortUrls,
    });
  } catch (error) {
    return errorResponse(res, "getAllUrl", error);
  }
};

export const getUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const shortUrl = await ShortUrlModel.findOne({ shortUrl: id });
    if (!shortUrl) {
      return res.status(404).json({
        success: false,
        message: "Full URL not found!",
      });
    }

    shortUrl.clicks++;
    shortUrl.save();
    return res.redirect(`${shortUrl.fullUrl}`);
  } catch (error) {
    return errorResponse(res, "getUrl", error);
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const shortUrl = await ShortUrlModel.findByIdAndDelete({ _id: id });
    if (!shortUrl) {
      return res.status(204).json({
        success: false,
        message: "URL not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "URL deleted successfully!",
    });
  } catch (error) {
    return errorResponse(res, "deleteUrl", error);
  }
};
