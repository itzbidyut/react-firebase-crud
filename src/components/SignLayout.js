import "../styles/signLayout.scss";

export default function SignLayout({ children }) {
  return (
    <div className="SignLayout">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <p className="heading">React firebase App</p>
            <img src="/assets/sign.png" alt="sign" className="signImage" />
          </div>
          <div className="col-12 col-md-5">
            <div className="SignChild">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
