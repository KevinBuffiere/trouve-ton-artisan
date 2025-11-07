import PropTypes from 'prop-types';

function ErrorState({ title, message, action }) {
  return (
    <div className="alert alert-danger" role="alert">
      <h2 className="h5 alert-heading">{title}</h2>
      <p className="mb-2">{message}</p>
      {action || null}
    </div>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  action: PropTypes.node,
};

ErrorState.defaultProps = {
  title: 'Une erreur est survenue',
  message: 'Veuillez réessayer dans quelques instants.',
  action: null,
};

export default ErrorState;
