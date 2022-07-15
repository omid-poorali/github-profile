import * as Models from "../../models";

export const getUserInfo = (username: string): Promise<Models.User> => {
    return new Promise((resolve) => {
        resolve({
            id: 0,
            login: username,
            avatar_url: "/avatar.png",
            name: "user_name",
            location: "location",
            email: "email",
            hireable: false,
            bio: "bio",
            twitter_username: "twitter_username",
            followers: 5,
            following: 5
        });
    });
}

export const getUserRepos = (username: string): Promise<Models.Repository[]> => {
    return new Promise((resolve) => {
        resolve([
            {
                id: 0,
                name: "repository_name",
                full_name: "full_name",
                description: "description",
                url: "url",
                issues_url: "issues_url",
                forks_count: 5,
                watchers_count: 5,
                topics: ["topic1", "topic2"]
            }
        ]);
    });
}