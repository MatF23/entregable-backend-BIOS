import { Request, Response } from "express";
import { Octokit } from "octokit";
import Search from "../models/searchModel";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function queryController(req: Request, res: Response) {
  try {
    const userName = req.query.name as string;

    if (!userName) {
      return res.status(400).json({ message: 'Missing or invalid "name" parameter in the query' });
    }

    const { data } = await octokit.rest.repos.listForUser({
      username: userName,
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// async (req, res) => {
//   const userName = req.query.name as string;

//   try {
//     const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

//     console.log("Hello, %s");

//     const response = await octokit.rest.search.users({
//       q: userName,
//     });

//     console.log("response", response);
//     res.json(response.data);
//   } catch (error: any) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// });