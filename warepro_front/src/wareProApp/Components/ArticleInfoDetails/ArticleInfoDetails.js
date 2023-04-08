import React  from 'react';


export default function ArticleInfoDetails({article}) {
    
    return(
        <div className="articleInfoDetails">
            <ul>
                <li>{article.code}</li>
                <li>{article.articleName}</li>
                <li>{article.price}</li>
                <li>{article.quantity}</li>
                <li>{article.creationDate}</li>
                <li>{article.modificationDate}</li>
                <li>{article.endOfUseDate == null ? 'Valid' : article.endOfUseDate}</li>
            </ul>
        </div>
    );
}