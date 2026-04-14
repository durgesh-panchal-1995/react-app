export const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-text">
          Question {current} of {total}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-percentage">{Math.round(percentage)}%</div>
    </div>
  );
};