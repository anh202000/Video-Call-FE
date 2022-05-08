import "./About.css";

const Develop = () => {
  return (
    <div style={{ padding: "130px" }} className="body">
      <div className="left-side">
        <div className="content">
          <h2 class="animate-charcter">Develop by AnhLPT</h2>
          <p style={{ color: "#000000" }}>
            The system
            <span
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0px 4px 0px 4px",
              }}
            >
              Smart Video Call
            </span>
            developed by young programmer{" "}
            <span
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0px 4px 0px 4px",
              }}
            >
              Le Phan Tuan Anh
            </span>{" "}
            and supported by lecturers from GW University,{" "}
            <span
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0px 4px 0px 4px",
              }}
            >
              Mr. VinhHN
            </span>
            ,{" "}
            <span
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0px 4px 0px 4px",
              }}
            >
              Mr. MinhTT
            </span>
            .
            <p style={{ color: "#000000" }}>
              During the development process we encountered a lot of problems,
              but all were completed and a big thank you to those who supported
              to complete this product.
            </p>
          </p>
        </div>
        <div className="help-text"></div>
      </div>
      <div className="right-side">
        <div className="content">
          <div id="slideshow">
            <div class="containerss">
              <img src="https://dividendwealth.co.uk/wp-content/uploads/2021/09/So-you-want-to-be-a-web-developer.png" />
              <img src="https://www.techgamingreport.com/wp-content/uploads/2021/08/how-to-become-a-web-developer.jpg" />
              <img src="https://media.istockphoto.com/photos/two-professional-it-programers-discussing-blockchain-data-network-picture-id1194430816?k=20&m=1194430816&s=612x612&w=0&h=znBRWJGZUelPaRB7Runi7_knJ1ZP80sxehEeSYZhoz0=" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Develop;
