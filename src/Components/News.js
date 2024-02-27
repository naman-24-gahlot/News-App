import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";


export function News ({country= "us", category= "general", pageSize= 5,setProgress=0, text, apiKey}){
    console.log("CHecking for Key ID section: "+apiKey)
      const [articles, setArticles] = useState([])
      const [loading, setLoading] = useState(false)
      const [page, setPage] = useState(1)
      const [hasMore, setHasMore] = useState(true)
      const [yesArticles, setYesArticles] = useState(true)
      const [totalResults, setTotalResults] = useState(0)
    
    
    
      const updateNews = async () => {
        if (setProgress) {
          setProgress(0);
        }
        
          setLoading(true)
        console.log("NEWS COMPONENT RECEIVED: "+text)
        console.log("API KEY received: "+apiKey)
          let apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}&category=${category}`;
        
          if (text) {
            apiURL += `&q=${encodeURIComponent(text)}`;
          }
        
          let data = await fetch(apiURL);
          if (setProgress) {
            setProgress(20);
          }
          let parsedData = await data.json();
          if (setProgress) {
            setProgress(79);
        
          }
        
          if (!parsedData.articles) {
            console.log("No news for this category");
            setLoading(false)
            setYesArticles(false)
            return;
          }
        
          if(parsedData.status === "error"){
            console.log("No news for this category");
            setYesArticles(false)
            return;
          }
        
        
        setLoading(false)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        if (setProgress){
          setProgress(100);
        }
        }
    
    useEffect(() => {
        updateNews();
      }, [category, text]);
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   useEffect(() => {
    //     const updateNews = async () => {
    //       if (setProgress) {
    //         setProgress(0);
    //       }
          
    //         setLoading(true)
    //       console.log("NEWS COMPONENT RECEIVED: "+text)
    //       console.log("API KEY received: "+apiKey)
    //         let apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}&category=${category}`;
          
    //         if (text) {
    //           apiURL += `&q=${encodeURIComponent(text)}`;
    //         }
          
    //         let data = await fetch(apiURL);
    //         if (setProgress) {
    //           setProgress(20);
    //         }
    //         let parsedData = await data.json();
    //         if (setProgress) {
    //           setProgress(79);
          
    //         }
          
    //         if (!parsedData.articles) {
    //           console.log("No news for this category");
    //           setLoading(false)
    //           setYesArticles(false)
    //           return;
    //         }
          
    //         if(parsedData.status === "error"){
    //           console.log("No news for this category");
    //           setYesArticles(false)
    //           return;
    //         }
          
          
    //       setLoading(false)
    //       setArticles(parsedData.articles)
    //       setTotalResults(parsedData.totalResults)
    //       if (setProgress){
    //         setProgress(100);
    //       }
    //       };
    
    
    //     updateNews();
    //   }, [country, category, pageSize, page, setProgress, text, apiKey]);
     
    
      const capitalize = (str) => {
        if (typeof str !== 'string' || str.length === 0) {
          return '';
        }
      
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    
    
    const fetchMoreData = async () => {
    
        if (articles.length >= totalResults) {
          setHasMore(false)
          return;
        }
    
        setPage(page + 1)
    
        setLoading(true)
        let apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}&category=${category}`;
        console.log("receiving this from parent: "+text)
       
        if (text) {
          apiURL += `&q=${encodeURIComponent(text)}`;
        }
    
        let data = await fetch(apiURL);
        let parsedData = await data.json();
    
        if (!parsedData.articles) {
          console.log("No news for this category");
          setLoading(false)
          setYesArticles(false)
          setHasMore(false)
          return;
        }
    
        if(parsedData.status === "error"){
          console.log("No news for this category");
          setLoading(false)
          setYesArticles(false)
          setHasMore(false)
          return;
        }
    
        setLoading(false)
        // setArticles(articles.concat(parsedData.articles))
        // setArticles([...articles, ...parsedData.articles])
        setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
        setTotalResults(parsedData.totalResults)
    
      };
    
    
        return (
          <div className="container my-3">
            <h2 align="center">
              <b>TOP HEADLINES {(category === 'general')? "": "from " + capitalize(category)}</b>
            </h2>
            <h4 align="center">presented by News App</h4>
            
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={hasMore}
              // loader={loading ? (yesArticles? <Spinner /> : <None />) :  (yesArticles? <None></None> : <None />)}
              loader={<Spinner /> }
            >
    
    {console.log("Current stack of Articles has"+articles.length)}
    <div className="container">
            <div className="row">
              {articles.map((element, index) => {
                  return (
                    <div key={index} className="col-md-4">
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : " "}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : " "
                        }
                        url={element.urlToImage}
                        newsURL={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
            </div>
    
            </InfiniteScroll>
          </div>
        );
    
    }
    
    export default News;
    
    
