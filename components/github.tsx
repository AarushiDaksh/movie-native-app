const GITHUB_TOKEN = process.env.EXPO_PUBLIC_GITHUB_TOKEN;

export const fetchGitHubUserData = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

export const fetchGitHubRepos = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Repos fetch failed");
  return res.json();
};
