import React from "react";
import PropTypes from "prop-types";

const Search = ({ text, value, handleChange }) => (


  <div className="form-group">
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={handleChange}
      required
    />
  </div>

      </div>
        </div>
    </div>
);

Search.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Search;