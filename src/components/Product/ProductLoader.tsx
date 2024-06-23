export const ProductLoader = () => (
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
                  width: "70%",
                }}
              >
                ""
              </div>
              <p
                data-testid="skeleton-text"
                className="is-skeleton"
                style={{
                  width: "60%",
                  backgroundColor: "#e0e0e0",
                }}
              >
                ""
              </p>
              <p
                data-testid="skeleton-text"
                className="is-skeleton"
                style={{
                  width: "60%",
                  backgroundColor: "#e0e0e0",
                }}
              >
                ""
              </p>
              <p
                data-testid="skeleton-text"
                className="is-skeleton"
                style={{
                  width: "60%",
                  backgroundColor: "#e0e0e0",
                }}
              >
                ""
              </p>
              <div className="has-text-right">
                <button className="button is-primary is-loading" disabled>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
