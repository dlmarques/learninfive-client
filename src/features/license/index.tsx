const License = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
      <h1 style={{ textAlign: "center" }}>License</h1>
      <div>
        <h3>Introduction</h3>
        <p>
          This application operates under the GNU Affero General Public License
          (AGPL v3), ensuring transparency and freedom for users who interact
          with it over a network. By using this application, you agree to the
          terms outlined in the license.
        </p>
      </div>
      <div>
        <h3>License Overview</h3>
        <p>
          This app is licensed under the GNU AGPL v3, which means: You are free
          to use, study, modify, and distribute this application. If you modify
          and deploy this application over a network, you must also provide
          access to the modified source code. The license prevents proprietary
          versions from being created without maintaining the same freedoms. For
          full details, you can read the official license text:{" "}
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.txt"
            target="_blank"
            rel="noopener noreferrer"
          >
            GNU AGPL v3 License
          </a>
        </p>
      </div>
      <div>
        <h3>Source Code</h3>
        <p>
          In compliance with AGPL v3, the source code of this application is
          made available. You can access it at:
          <a
            href="https://github.com/dlmarques/learninfive-client"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>GitHub Repo.</p>
          </a>
          If you have any questions or need access to the source code, please
          contact:{" "}
          <a
            href="mailto:daniel.marquesedigital@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            email
          </a>{" "}
          or{" "}
          <a
            href="https://dlmarques.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            website.
          </a>
        </p>
      </div>
      <div>
        <h3>License Overview</h3>
        <p>
          Copyright © 2025 Daniel Marques. All rights are reserved under AGPL v3
          unless otherwise stated.
        </p>
      </div>
      <div style={{ paddingBottom: "32px" }}>
        <h3>Disclaimer</h3>
        <p>
          This software is provided "as is," without any warranties or
          guarantees. The developers are not liable for any damages arising from
          the use of this application.
        </p>
      </div>
    </div>
  );
};

export default License;
