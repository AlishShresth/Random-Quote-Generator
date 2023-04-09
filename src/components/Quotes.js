import React, { useState, useEffect } from "react";
import twitterIcon from "../twitter.svg";
import tumblrIcon from "../tumblr.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { colors } from "./Colors";
import ReactLoading from "react-loading";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("blue");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    document.body.style.background = color;
  }, [color]);

  const getQuote = () => {
    let url =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        let dataQuotes = data.quotes;
        let randomNum = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = dataQuotes[randomNum];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
        setColor(randomColor);
      });
  };

  const handleClick = () => {
    getQuote();
  };

  const handleSound = () => {
    // SpeechSynthesisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${quote}`);
    speechSynthesis.speak(utterance); // speak method of speechSynthesis speaks the utterance
  };

  let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${quote} 
    -${author}`
  )}`;
  let tumblrUrl = `https://www.tumblr.com/new/quote?body=${encodeURIComponent(
    `${quote} 
    -${author}`
  )}`;

  return (
    <div
      id="quote-box"
      style={{
        color: color,
        transitionProperty: color,
        transitionDuration: "2s",
      }}
    >
      <div
        id="text"
        style={{
          color: color,
          transitionProperty: color,
          transitionDuration: "2s",
        }}
      >
        <i className="bi bi-quote"></i>
        {isLoading && <ReactLoading type="spinningBubbles" color="#444" />}

        <p>{quote}</p>
      </div>
      <div id="author">
        <p>-{author}</p>
      </div>
      <div id="buttons">
        <div className="social-media">
          <a
            href={twitterUrl}
            id="tweet-quote"
            target="_blank"
            rel="noreferrer"
            style={{ background: color }}
          >
            <span>
              <img
                src={twitterIcon}
                alt="Twitter"
                height="20px"
                width="20px"
                style={{ background: color }}
              />
            </span>
          </a>
          <a
            href={tumblrUrl}
            id="tumlr-quote"
            target="_blank"
            rel="noreferrer"
            style={{ background: color }}
          >
            <span>
              <img src={tumblrIcon} alt="Tumblr" height="20px" width="20px" />
            </span>
          </a>

          <i
            className="bi bi-volume-up"
            onClick={handleSound}
            style={{ background: color }}
          ></i>
        </div>
        <button
          onClick={handleClick}
          id="new-quote"
          className="btn btn-outline-light m-2"
          style={{ border: `2px solid ${color}`, color: `${color}` }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default Quotes;
