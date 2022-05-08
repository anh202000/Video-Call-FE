import "./About.css";

const Policies = () => {
  return (
    <div style={{ padding: "130px" }} className="body">
      <div className="left-side">
        <div className="content">
          <h2 class="animate-charcter">Program Policies SVC</h2>
          <p style={{ color: "#000000" }}>
            There is program polices of Smart Video Call
          </p>
          <h4
            style={{
              color: "#00796b",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Child Sexual Abuse and Exploitation
          </h4>

          <p style={{ color: "#000000", fontSize: "14px" }}>
            Do not use Meet to create, upload, or distribute content that
            exploits or abuses children. This includes all child sexual abuse
            materials.
          </p>

          <p style={{ color: "#000000", fontSize: "14px" }}>
            More broadly, Meet prohibits the use of our products to endanger
            children. This includes but is not limited to predatory behavior
            towards children.
          </p>

          <p style={{ color: "#000000", fontSize: "14px" }}>
            We will take appropriate action, which may include reporting to the
            National Center for Missing & Exploited Children, limiting access to
            product features, and disabling accounts. If you believe a child is
            in danger of or has been subject to abuse, exploitation, or
            trafficking, contact the police immediately.
          </p>

          {/*  */}
          <h4
            style={{
              color: "#00796b",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Circumvention
          </h4>

          <p style={{ color: "#000000", fontSize: "14px" }}>
            Do not engage in actions intended to bypass our policies or subvert
            restrictions placed on your account. This includes the creation or
            use of multiple accounts or other methods intended to engage in a
            behavior that was previously prohibited.
          </p>

          {/*  */}
          <h4
            style={{
              color: "#00796b",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Fraud, Phishing, and Other Deceptive Practices
          </h4>

          <p style={{ color: "#000000", fontSize: "14px" }}>
            Do not use SVC for phishing. Refrain from soliciting or collecting
            sensitive data, including but not limited to passwords, financial
            details, and Social Security numbers. Do not use Meet to trick,
            mislead, or deceive other users into sharing information under false
            pretenses. Do not impersonate another person or otherwise
            misrepresent yourself or the source of a Meet invitation or join
            request with the intent to deceive, mislead, or defraud.
          </p>

          {/*  */}
          <h4
            style={{
              color: "#00796b",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Hate Speech
          </h4>
          <p style={{ color: "#000000", fontSize: "14px" }}>
            Do not engage in hate speech. Hate speech is content that promotes
            or condones violence against or has the primary purpose of inciting
            hatred against an individual or group on the basis of their race or
            ethnic origin, religion, disability, age, nationality, veteran
            status, sexual orientation, gender, gender identity, or any other
            characteristic that is associated with systemic discrimination or
            marginalization.
          </p>

          {/*  */}
          <h4
            style={{
              color: "#00796b",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Spam
          </h4>
          <p style={{ color: "#000000", fontSize: "14px" }}>
            Do not spam. This may include unwanted promotional or commercial
            content, unwanted content that is created by an automated program,
            unwanted repetitive content, nonsensical content, or anything that
            appears to be a mass solicitation.
          </p>

          {/*  */}
          <h4
            style={{
              color: "#00796b",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Terrorist Content
          </h4>
          <p style={{ color: "#000000", fontSize: "14px" }}>
            Terrorist organizations are not permitted to use this product for
            any purpose, including recruitment. We’ll also take action against
            Meeting organizers or participants for content related to terrorism,
            such as promoting terrorist acts, inciting violence, or celebrating
            terrorist attacks.
          </p>
        </div>
        <div className="help-text">
          
        </div>
      </div>
      <div className="right-side">
        <div className="content">
          <div id="slideshow">
            <div class="containerss">
              <img src="https://resources.workable.com/wp-content/uploads/2015/12/thumb-the-5-company-policies-you-need-to-have-in-writing.png" />
              <img src="https://www.integrify.com/site/assets/files/2728/roll-out-new-company-policy.png" />
              <img src="https://www.alert-software.com/hubfs/writing%20company%20policies.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
