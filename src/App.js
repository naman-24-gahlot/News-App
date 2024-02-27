import './App.css';
import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
export default function App () {
  let pageSize = "20";
  let country = "us";
  const apiKey = process.env.REACT_APP_API_KEY;

  const [visible, setVisible] = useState(true);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    setVisible(window.scrollY < document.body.scrollHeight - window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {console.log("THE API KEY IS READ AS: " + apiKey)}
      <Router>
        <Navbar setText={(text) => setText(text)} setProgress={setProgress} style={{ visibility: visible ? 'visible' : 'hidden' }}></Navbar>
        <LoadingBar color='#6bd9e5' progress={progress} />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<News text={text} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category="general" />} />
            <Route exact path="/home" element={<News text={text} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category="general" />} />
            <Route exact path="/entertainment" element={<News text={text} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category="entertainment" />} />
            <Route exact path="/science" element={<News text={text} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category="science" />} />
            <Route exact path="/technology" element={<News text={text} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category="technology" />} />
            <Route exact path="/sports" element={<News text={text} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category="sports" />} />
            <Route exact path="/health" element={<News text={text} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category="health" />} />
            <Route exact path="/business" element={<News text={text} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category="business" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
