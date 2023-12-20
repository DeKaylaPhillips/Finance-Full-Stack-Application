// This service handles API calls to retrieve the latest news articles.
import axiosInstance from "./axiosInstance";

export const ArticleService = {
    getArticles: async () => {
        try {
            const response = await axiosInstance.get("/articles/");
            if (response.status === 200) {
                const articles = response.data.data.articles;

                if ("feed" in articles) {
                    return { success: true, articles: articles.feed };
                } else if ("Information" in articles) {
                    return { success: false, error: "Uh-oh! Looks like the API rate limit max was met. :( Please try again, later!" };
                }
            }
        } catch (error) {
            throw error;
        }
    },
};
