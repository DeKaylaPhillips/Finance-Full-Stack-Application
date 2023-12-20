import { useEffect, useState } from "react";
import { ArticleService } from "../services/articleService";
import levenshtein from "fast-levenshtein";

export const useArticles = (callback) => {
  const [articlesState, setArticlesState] = useState(null);
  const [articlesError, setArticlesError] = useState(null);

  const getUniqueArticles = (articles) => {
    const uniqueArticles = [];
    const similarityThreshold = 0.5;

    articles.forEach((article) => {
      const isDuplicate = uniqueArticles.some((uniqueArticle) => {
        const distance = levenshtein.get(article.title, uniqueArticle.title);
        const thresholdDistance = Math.floor(
          Math.min(article.title.length, uniqueArticle.title.length) *
            similarityThreshold
        );
        return distance <= thresholdDistance;
      });

      if (!isDuplicate) {
        uniqueArticles.push(article);
      }
    });

    return uniqueArticles;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const results = await ArticleService.getArticles();
        if (results.success) {
          const uniqueArticles = getUniqueArticles(results.articles);
          setArticlesState({
            success: true,
            articles: uniqueArticles,
          });
        } else {
          setArticlesError(results.error);
        }
      } catch (error) {
        setArticlesError(error.message);
      }
    };

    fetchArticles();
  }, []);

  return { ...articlesState, articlesError };
};
