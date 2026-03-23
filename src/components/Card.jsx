export default function Card({ title, detail, icon, button, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">{title}</p>
        {detail && <p className="card-detail">{detail}</p>}
        {icon && <p className="card-icon">{icon}</p>}
        {button && <button className="small-button">{button}</button>}
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}