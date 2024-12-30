import React, { Component } from 'react'
import NewsItem from './NewsItem'
import cat from "./cat.jpg"
export class News extends Component {
   articles=[]
    constructor(){
        //  super constructor in derived class before accessing 'this' 
        super()
        console.log("Hello I am a constructor from News component")

        this.state={
            articles:this.articles,
            loading:false,
            page:1
        }
    }
    prevHandler=async()=> {
        let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=733d63120c1e4a95b6cbe9ef97c8adc1&pageSize=20&page=${this.state.page-1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
        page:this.state.page-1,
        articles:parsedData.articles,
        })     
    }
    nextHandler=async()=> {
        console.log("Next")
        if(Math.ceil(this.state.totalResults/20)>=this.state.page+1){
        let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=733d63120c1e4a95b6cbe9ef97c8adc1&pageSize=20&page=${this.state.page+1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
        page:this.state.page+1,
        articles:parsedData.articles,
        })     
    }
    }
  
    // run after render method is run
    async componentDidMount(){
        console.log("Run after render")
        let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=733d63120c1e4a95b6cbe9ef97c8adc1&pageSize=20&page=1`
        let data = await fetch(url);
        let parsedData = await data.json();
        // fetch will return a promise
        // async function can await some promises inside it
        // yeh return bhi ek promise karta hai
        // or jo promise aayi hai usko hum json / text meh convert kar sakte hai 
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            loading:false,
            totalResults:parsedData.totalResults
        })
        // will be a promise itself

    }
   
  render() {
    console.log("Run before componentdidmount")
    return (
      <div className='container my-3'>
        <h2>NewsNexus- Top Headlines</h2>
        <div className="row">
        {this.state.articles.map(({title,description,urlToImage,url})=>{
        return(
        <div className="col md-4" key ={url}>
        <NewsItem  title={title&& title.slice(0,50)} description={(description)&& description.slice(0,90)} imageUrl={(!urlToImage)?cat:urlToImage} newsUrl={url}/>
        </div>
        )
        })
        }
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-between">
  <button disabled={this.state.page<=1} class="btn btn-dark me-md-2" type="button" onClick={this.prevHandler}> &larr; Previous </button>
  <button disabled={this.state.page >= Math.ceil(this.state.totalResults / 20)} className="btn btn-dark" type="button" onClick={this.nextHandler}>Next &rarr;</button>
</div>
      </div>
    )
  }
}

// total pages = no of articles / page size === page numnber
export default News
