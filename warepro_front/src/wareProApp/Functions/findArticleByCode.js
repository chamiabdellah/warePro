

export default async function findArticleByCode(code, setArticle){
    const endpointURL = "http://localhost:8080/api/articles/manageArticles/article?code="+code;

    const requestOptions = {
        method:'GET',
        headers: {'Content-Type': 'application/json','Accept': 'application/json'}
    };

    const response = await fetch(endpointURL, requestOptions);

    if(response.status === 200){
        console.log("an article was found");
        setArticle(await response.json());
    } else {
        setArticle(null);
        console.log("still searching");
    }

}