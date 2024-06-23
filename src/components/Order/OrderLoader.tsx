import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

export const OrderLoader = () => (
  <div className="columns is-multiline">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="column is-one-quarter">
        <div className="card" data-testid="skeleton-card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img className="is-skeleton" alt="" />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <div
                className="title is-4 is-skeleton"
                style={{
                  width: "90%",
                }}
              >
                ""
              </div>
              <p
                className="is-skeleton"
                data-testid="skeleton-text"
                style={{
                  width: "60%",
                  backgroundColor: "#e0e0e0",
                }}
              >
                ""
              </p>
              <p
                className="is-skeleton"
                data-testid="skeleton-text"
                style={{
                  width: "60%",
                  backgroundColor: "#e0e0e0",
                }}
              >
                ""
              </p>
              <p
                className="is-skeleton"
                data-testid="skeleton-text"
                style={{
                  width: "60%",
                  backgroundColor: "#e0e0e0",
                }}
              >
                ""
              </p>

              <div className="is-flex is-justify-content-space-between">
                <div className="dropdown is-skeleton">
                  <div className="dropdown-trigger is-skeleton">
                    <button
                      className="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    >
                      <span className="is-skeleton">Products</span>
                      <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="has-text-right">
                  <button className="button is-primary is-loading" disabled>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
