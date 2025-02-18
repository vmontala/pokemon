import './Wrapper.css';

export default function Wrapper ({ header, children, footer, className }) {
  return (
    <section className={`wrapper ${className || ''}`}>
      {header && (
        <header className="wrapper__header">
          {header}
        </header>
      )}
      <div className="wrapper__body">
        {children}
      </div>
      {footer && (
        <footer className="wrapper__footer">
          {footer}
        </footer>
      )}
    </section>
  );
}
