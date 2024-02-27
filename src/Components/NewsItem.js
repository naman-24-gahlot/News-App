// import React, { Component } from "react";

export function NewsItem (props) {

    let { title, description, url, newsURL, author, date, source } = props
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              url
                ? url
                : "https://as2.ftcdn.net/v2/jpg/05/17/53/57/1000_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              {title.length >= 30 ? "..." : ""}
            </h5>
            <span
  className="position-absolute top-0 end-0 badge rounded-pill bg-info"
  style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    right: 0,
    marginLeft: `calc(100% - ${source ? source.length * 8 : 0}px)`, // Adjust the multiplier as needed
    marginTop: '-5px'   // Adjust the margin
  }}
>


              {source}
            </span>

            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );

}

export default NewsItem;
