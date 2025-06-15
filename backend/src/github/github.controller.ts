import { Controller, Get, Param, Res } from "@nestjs/common";
import { GithubService } from "./github.service";
import { Response } from "express";

@Controller('github')
export class GithubController {
    constructor(
        private readonly githubService: GithubService,
    ) {}

    @Get(':username/')
    async getUser(@Param('username') username: string) {
        return this.githubService.getUser(username);
    }
    @Get(':username/repos')
    async getUserRepos(@Param('username') username: string) {
        return this.githubService.getUserRepos(username);
    }
    @Get(':username/export')
    async exportReposAsCSV(@Param('username') username: string, @Res() res: Response) {
        const csv = await this.githubService.exportReposAsCSV(username);
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename${username}_repos.csv`)
        res.send(csv)
    }
    
}