package com.warepro.spring.ArticleManagement.repository;

import com.warepro.spring.ArticleManagement.domain.ArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<ArticleEntity, String> {
    List<ArticleEntity> findArticleEntitiesByEndOfUseDateIsNull();
    boolean existsArticleEntityByCode(String code);
    ArticleEntity getArticleEntityByCode(String code);
}
