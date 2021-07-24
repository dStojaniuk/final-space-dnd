import './ResetButton.css';

export const ResetButton = (props: ResetButtonProps) => {
  const { onClickEvent } = props;
  return (
    <div className="reset-button" onClick={onClickEvent}>
      Reset List
    </div>
  );
};

type ResetButtonProps = {
  onClickEvent: any;
};
