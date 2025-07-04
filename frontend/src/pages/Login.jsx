// LoginPage.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./css/base.css";
import "./css/index.css";
import "./css/login.css";

export default function LoginPage({ hasMessages, messages = [], csrfToken }) {
  return (
    <main>
      <section className="prompt">
        <h3>todos</h3>
        <h1>Sign&nbsp;in</h1>

        {hasMessages && (
          <section className="messages">
            {messages.map((message, idx) => (
              <p key={idx}>{message}</p>
            ))}
          </section>
        )}

        {/* In a SPA you’d normally handle submission with an onSubmit handler,
            but the original markup posted directly to /login/password.
            Keep that action if the route still expects a traditional POST. */}
        <form action="/login/password" method="post">
          <section>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              autoFocus
            />
          </section>

          <section>
            <label htmlFor="current-password">Password</label>
            <input
              id="current-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </section>

          <input type="hidden" name="_csrf" value={csrfToken} />

          <button type="submit">Sign&nbsp;in</button>
        </form>

        <hr />

        <p className="help">
          Don&apos;t have an account? <Link to="/signup">Sign&nbsp;up</Link>
        </p>
      </section>

      <footer className="info">
        <p>
          Created by{" "}
          <a href="https://www.jaredhanson.me" target="_blank" rel="noreferrer">
            Jared&nbsp;Hanson
          </a>
        </p>
        <p>
          Part of{" "}
          <a href="https://todomvc.com" target="_blank" rel="noreferrer">
            TodoMVC
          </a>
        </p>
        <p>
          Authentication powered by{" "}
          <a href="https://www.passportjs.org" target="_blank" rel="noreferrer">
            Passport
          </a>
        </p>
      </footer>
    </main>
  );
}

LoginPage.propTypes = {
  hasMessages: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.string),
  csrfToken: PropTypes.string,
};
