import PropTypes from 'prop-types';

function LoadingState({ label }) {
  return (
    <div className="text-center py-5" role="status" aria-live="polite">
      <div className="spinner-border text-primary" role="presentation" />
      <p className="mt-3 mb-0">{label}</p>
    </div>
  );
}

LoadingState.propTypes = {
  label: PropTypes.string,
};

LoadingState.defaultProps = {
  label: 'Chargement en cours…',
};

export default LoadingState;
