// types.ts
export interface GitHubUser {
    login: string;
    name: string | null;
    email: string | null;
    avatar_url: string;
    followers: number;
    following: number;
  }
  
  export interface GitHubRepo {
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
  }
  