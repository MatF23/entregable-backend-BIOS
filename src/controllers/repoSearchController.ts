import { Request, Response } from "express";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function repoSearchController(req: Request, res: Response) {
  try {
    // Obtén el nombre de usuario de la consulta
    const userName = req.query.name as string;

    // Verifica si el nombre de usuario está presente en la consulta
    if (!userName) {
      return res.status(400).json({ message: 'Missing or invalid "name" parameter in the query' });
    }

    // Realiza la búsqueda de repositorios para el nombre de usuario dado
    const { data } = await octokit.rest.repos.listForUser({
      username: userName,
    });

    // Envía la respuesta con la información de los repositorios
    res.status(200).json({ repositories: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
