import { Injectable, ParseArrayPipe } from "@nestjs/common";
import axios from "axios";
import { GITHUB_API } from "src/config";
import { Parser } from "json2csv"

@Injectable()
export class GithubService {
    
    async getUser(username: string) {
        const res = await axios.get(`${GITHUB_API}/users/${username}`)
        return res.data
    }
    async getUserRepos(username: string) {
        const res = await axios.get(`${GITHUB_API}/users/${username}/repos`)

        return res.data.map(repo => ({
            username: repo.owner.login,
            repo_name: repo.name,
            language: repo.language,
            stars: repo.stargazers_count
        }))
    }
    async exportReposAsCSV(username: string) {
        const repos = await this.getUserRepos(username);

        const fields = ['username', 'repo_name', 'language', 'stars']
        const parser = new Parser({ fields })
        const csv = parser.parse(repos)

        return csv;
    }
}